import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { StudentIntro } from '../models/StudentIntro'
import * as web3 from '@solana/web3.js'

const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf'

export const StudentIntroList: FC = () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([])

    useEffect(() => {
        connection.getProgramAccounts(new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID))
        .then(async (accounts) => {
            const studentintros: StudentIntro[] = accounts.reduce((accum: StudentIntro[], { pubkey, account }) => {
                // pubkey: new address (pda)
                // account.owner: STUDENT_INTRO_PROGRAM_ID
                const studentintro = StudentIntro.deserialize(account.data)
                if (!studentintro) {
                    return accum
                }

                return [...accum, studentintro]
            }, [])
            // const studentintros: StudentIntro[] = accounts
            // .map(({ account }) => StudentIntro.deserialize(account.data))
            // .filter(studentintro => studentintro !== null) as StudentIntro[];
            setStudentIntros(studentintros)
        })
    }, [])

    return (
        <div>
            {
                studentIntros.map((studentIntro, i) => <Card key={i} studentIntro={studentIntro} /> )
            }
        </div>
    )
}