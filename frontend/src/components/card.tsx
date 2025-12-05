interface VoteOption {
  id: string
  location: string
  time: string
  votes: number
  voters: string[]
}

interface RoleCardProps {
  option: VoteOption
  currentUserId: string
  onVote: (optionId: string) => void
  allOptions: VoteOption[]
}

export function RoleCard({ option, currentUserId, onVote, allOptions }: RoleCardProps) {
  const totalVotes = allOptions.reduce((sum, opt) => sum + opt.votes, 0)
  const userHasVoted = allOptions.some(opt => opt.voters.includes(currentUserId))
  const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100)
  const isWinning = option.votes > 0 && option.votes === Math.max(...allOptions.map(o => o.votes))

  const handleVote = () => {
    onVote(option.id)
  }

  return (
    <div
      className={`relative bg-slate-600 rounded-lg p-6 text-white min-h-[300px] flex flex-col cursor-pointer transition-all hover:scale-[1.02] ${
        isWinning
          ? 'border-4 border-yellow-400 shadow-lg shadow-yellow-400/30'
          : 'border-2 border-slate-700 hover:border-emerald-500'
      }`}
      onClick={handleVote}
    >
      {/* Badge de vencedor */}
      {isWinning && (
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1">
          🏆 Vencendo
        </div>
      )}

      {/* Barra de progresso no fundo */}
      <div
        className="absolute inset-0 bg-emerald-600/20 transition-all duration-500 rounded-lg"
        style={{ width: `${percentage}%` }}
      />

      {/* Conteudo */}
      <div className="relative flex flex-col h-full">
        {/* Local */}
        <div className="mb-4">
          <p className="text-sm text-slate-400 mb-1">Local:</p>
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-300">
            {option.location}
          </h2>
        </div>

        {/* Horario */}
        <div className="mb-6">
          <p className="text-sm text-slate-400 mb-1">Horario:</p>
          <p className="text-xl font-bold text-white">
            {option.time}
          </p>
        </div>

        {/* Votos */}
        <div className="mt-auto">
          <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">👍</span>
              <div>
                <p className="text-lg font-bold text-emerald-300">
                  {option.votes} {option.votes === 1 ? 'voto' : 'votos'}
                </p>
                <p className="text-xs text-slate-400">
                  {percentage}% dos votos
                </p>
              </div>
            </div>

            <div className="text-emerald-400 text-sm font-bold">
              Clique para votar →
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de ja votou */}
      {userHasVoted && option.voters.includes(currentUserId) && (
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          ✓ Seu voto
        </div>
      )}
    </div>
  )
}
