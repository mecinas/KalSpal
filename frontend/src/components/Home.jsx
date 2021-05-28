import React from 'react'

import Login from "./Login"
import BenefitCard from './BenefitCard'

export default function Home() {
    return (
        <div className="container my-5">
            <Login />

            <div className="row justify-content-center my-5">
                <BenefitCard header="Motywacja" title="Codzienne powiadomienia" text="Dzięki wbudowanej możliwości ustawienia powiadomień, będziesz wreszcie w stanie utrzymać regularny cykl ćwiczeń." />
                <BenefitCard header="Zdrowie" title="Zaplanuj kalorie" text="Możliwość śledzenia spalonych kalorii w ciągu miesiąca pozwoli lepiej zaplanować dietę i ułatwić utrzymanie upragnionej wagi." />
                <BenefitCard header="Relacje" title="Sieć znajomych" text="Portal społecznościowy pozwoli Ci nawiązać nowe kontakty z osobami o wspólnych pasjach i celach." />
            </div>

        </div>
    )
}
