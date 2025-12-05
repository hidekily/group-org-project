import { RoleCard } from '@/components/card'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/group/')({
  component: RouteComponent,
})

interface VoteOption {
  id: string
  location: string
  time: string
  votes: number
  voters: string[]
}

function RouteComponent() {
  const currentUserId = 'user123'

  const [options, setOptions] = useState<VoteOption[]>([
    { id: '1', location: '', time: '', votes: 0, voters: [] },
    { id: '2', location: '', time: '', votes: 0, voters: [] },
    { id: '3', location: '', time: '', votes: 0, voters: [] }
  ])

  const handleVote = (optionId: string) => {
    setOptions(prevOptions => {
      const userAlreadyVoted = prevOptions.some(opt => opt.voters.includes(currentUserId))

      if (userAlreadyVoted) {
        return prevOptions.map(opt => {
          if (opt.voters.includes(currentUserId)) {
            return {
              ...opt,
              votes: opt.votes - 1,
              voters: opt.voters.filter(id => id !== currentUserId)
            }
          }
          if (opt.id === optionId) {
            return {
              ...opt,
              votes: opt.votes + 1,
              voters: [...opt.voters, currentUserId]
            }
          }
          return opt
        })
      }

      return prevOptions.map(opt =>
        opt.id === optionId
          ? { ...opt, votes: opt.votes + 1, voters: [...opt.voters, currentUserId] }
          : opt
      )
    })
  }

  const handleLocationChange = (optionId: string, newLocation: string) => {
    setOptions(prevOptions =>
      prevOptions.map(opt =>
        opt.id === optionId ? { ...opt, location: newLocation } : opt
      )
    )
  }

  const handleTimeChange = (optionId: string, newTime: string) => {
    setOptions(prevOptions =>
      prevOptions.map(opt =>
        opt.id === optionId ? { ...opt, time: newTime } : opt
      )
    )
  }

  return (
    <section className='min-h-screen flex flex-col justify-start items-center p-4'>
      <h1 className='text-3xl md:text-4xl font-bold text-emerald-300 my-6'>
        Votacao do Role
      </h1>

      <div className='w-full max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {options.map(option => (
            <div key={option.id} className='flex flex-col gap-3'>
              <input
                type='text'
                value={option.location}
                onChange={(e) => handleLocationChange(option.id, e.target.value)}
                placeholder='Digite o local do role...'
                className='p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 border-2 border-slate-700 focus:border-emerald-500 outline-none transition-colors'
              />

              <input
                type='time'
                value={option.time}
                onChange={(e) => handleTimeChange(option.id, e.target.value)}
                className='p-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-emerald-500 outline-none transition-colors'
              />

              <RoleCard
                option={option}
                currentUserId={currentUserId}
                onVote={handleVote}
                allOptions={options}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
