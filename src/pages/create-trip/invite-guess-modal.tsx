import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"

interface InviteGuessModalProps {
    closeGuestModal: () => void
    emailsToInvite: string[]
    addEmail: (event: FormEvent<HTMLFormElement>) => void
    removeEmail: (email: string) => void
}

export function InviteGuessModal({addEmail, closeGuestModal, emailsToInvite, removeEmail}: InviteGuessModalProps) {
    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
                <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold'>Selecionar Convidados</h2>
                    <button onClick={closeGuestModal}><X className='size-5 text-zinc-400'/></button>
                </div>

                <p className='text-sm text-zinc-400'>Os Convidados vão receber e-mails para confirmar participação na viagem</p>
                </div>

                <div className="flex flex-wrap gap-2">
                {emailsToInvite.map(email => (
                    <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className='text-zinc-300'>{email}</span>
                    <button onClick={() => removeEmail(email)} type='button'><X className='size-4'/></button>
                    </div>
                ))}
                </div>

                <div className="w-full h-px bg-zinc-800"></div>

                <form onSubmit={addEmail} className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-md flex items-center justify-between'>
                <div className="flex items-center gap-2">
                    <AtSign className='size-5 text-zinc-400 ' />
                    <input type="email" name="email" placeholder="Digite o email do convidado" className='bg-transparent outline-none' />
                </div>
                

                <button type='submit' className='bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-lime-400'>
                    Convidar
                    <Plus className='size-5 text-lime-950' />
                </button>
                </form>
            </div>
        </div>
    )
}