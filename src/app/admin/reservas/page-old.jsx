'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FiArrowLeft,
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiClock,
  FiUsers,
  FiX,
  FiTrash2,
  FiGrid
} from 'react-icons/fi'
import Link from 'next/link'
import { reservasApi } from '@/lib/api'

export default function ReservasAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all', 'pendente', 'confirmada', 'cancelada'

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/admin/login')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session) {
      fetchReservas()
    }
  }, [session])

  const fetchReservas = async () => {
    try {
      const data = await reservasApi.getAll()
      setReservas(data)
    } catch (error) {
      console.error('Erro ao carregar reservas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      try {
        await reservasApi.cancel(id)
        await fetchReservas()
      } catch (error) {
        console.error('Erro ao cancelar reserva:', error)
        alert('Erro ao cancelar reserva')
      }
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta reserva? Esta ação não pode ser desfeita.')) {
      try {
        await reservasApi.delete(id)
        await fetchReservas()
      } catch (error) {
        console.error('Erro ao excluir reserva:', error)
        alert('Erro ao excluir reserva')
      }
    }
  }

  const filteredReservas = reservas.filter(reserva => {
    if (filter === 'pendente') return reserva.status === 'pendente'
    if (filter === 'confirmada') return reserva.status === 'confirmada' 
    if (filter === 'cancelada') return reserva.status === 'cancelada'
    return true
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const formatReservaDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const pendenteCount = reservas.filter(r => r.status === 'pendente').length
  const confirmadaCount = reservas.filter(r => r.status === 'confirmada').length
  const cancelledCount = reservas.filter(r => r.status === 'cancelada').length

  return (
    <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <FiArrowLeft className="mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary">
              Gerenciar Reservas
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-base text-muted-foreground">
                Total: {reservas.length} reservas
              </p>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                {pendenteCount} pendentes
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {confirmadaCount} confirmadas
              </span>
              <span className="px-2 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
                {cancelledCount} canceladas
              </span>
            </div>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas ({reservas.length})
          </Button>
          <Button
            variant={filter === 'pendente' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pendente')}
            className={filter === 'pendente' ? '' : 'text-yellow-700 border-yellow-300 hover:bg-yellow-50'}
          >
            Pendentes ({pendenteCount})
          </Button>
          <Button
            variant={filter === 'confirmada' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('confirmada')}
            className={filter === 'confirmada' ? '' : 'text-green-700 border-green-300 hover:bg-green-50'}
          >
            Confirmadas ({confirmadaCount})
          </Button>
          <Button
            variant={filter === 'cancelada' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('cancelada')}
            className={filter === 'cancelada' ? '' : 'text-destructive border-destructive/20 hover:bg-destructive/10'}
          >
            Canceladas ({cancelledCount})
          </Button>
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="space-y-4">
        {filteredReservas.map((reserva) => {
          const getStatusColor = (status) => {
            switch(status) {
              case 'pendente': return 'border-l-yellow-400 bg-yellow-50/50'
              case 'confirmada': return 'border-l-green-400 bg-green-50/50'  
              case 'cancelada': return 'border-l-red-400 bg-red-50/50'
              default: return 'border-l-gray-400'
            }
          }
          
          const getStatusDot = (status) => {
            switch(status) {
              case 'pendente': return 'bg-yellow-400'
              case 'confirmada': return 'bg-green-400'
              case 'cancelada': return 'bg-red-400'
              default: return 'bg-gray-400'
            }
          }
          
          return (
            <Card key={reserva.id} className={`shadow-sm border-l-4 ${getStatusColor(reserva.status)}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusDot(reserva.status)}`} />
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        <FiUser className="mr-2 text-muted-foreground" />
                        {reserva.nome}
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                        reserva.status === 'pendente' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : reserva.status === 'confirmada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {reserva.status === 'pendente' ? 'Pendente' : 
                         reserva.status === 'confirmada' ? 'Confirmada' : 'Cancelada'}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <FiCalendar className="mr-1" />
                      Reservada em: {formatDate(reserva.dataReserva)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {reserva.status === 'ativa' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancel(reserva.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <FiX className="mr-1" />
                      Cancelar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(reserva.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <FiTrash2 className="mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>

              {/* Informações de contato */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <FiMail className="mr-2" />
                  <span className="text-sm">{reserva.email}</span>
                </div>
                {reserva.telefone && (
                  <div className="flex items-center text-muted-foreground">
                    <FiPhone className="mr-2" />
                    <span className="text-sm">{reserva.telefone}</span>
                  </div>
                )}
                <div className="flex items-center text-muted-foreground">
                  <FiUsers className="mr-2" />
                  <span className="text-sm">{reserva.pessoas} pessoas</span>
                </div>
              </div>

              {/* Detalhes da reserva */}
              <div className="bg-accent/5 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <FiCalendar className="mr-2 text-primary" />
                      <strong className="text-sm">Data da Reserva:</strong>
                    </div>
                    <p className="text-sm ml-6">{formatReservaDate(reserva.data)}</p>
                  </div>
                  
                  {reserva.horario && (
                    <div>
                      <div className="flex items-center mb-1">
                        <FiClock className="mr-2 text-accent-foreground" />
                        <strong className="text-sm">Horário:</strong>
                      </div>
                      <p className="text-sm ml-6">{reserva.horario}</p>
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <FiGrid className="mr-2 text-secondary-foreground" />
                      <strong className="text-sm">Churrasqueira:</strong>
                    </div>
                    <p className="text-sm ml-6">
                      {reserva.churrasqueiraNome || `ID: ${reserva.churrasqueiraId}`}
                    </p>
                  </div>
                </div>

                {reserva.observacoes && (
                  <div>
                    <strong className="text-sm">Observações:</strong>
                    <p className="text-sm text-muted-foreground mt-1 ml-4 italic">
                      "{reserva.observacoes}"
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReservas.length === 0 && (
        <div className="text-center py-12">
          <FiCalendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {filter === 'all' ? 'Nenhuma reserva encontrada' :
             filter === 'ativa' ? 'Nenhuma reserva ativa' :
             'Nenhuma reserva cancelada'}
          </h3>
          <p className="text-muted-foreground">
            {filter === 'all' 
              ? 'As reservas feitas pelo site aparecerão aqui'
              : 'Mude o filtro para ver outras reservas'
            }
          </p>
        </div>
      )}
    </section>
  )
}