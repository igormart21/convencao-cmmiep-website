'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        { q: "Qual o prazo de produção?", a: "O prazo varia conforme o material e quantidade, mas prezamos pela agilidade. Materiais impressos geralmente ficam prontos em 2 a 5 dias úteis." },
        { q: "Vocês fazem instalação?", a: "Sim! Temos equipe especializada para instalação de fachadas, adesivos e placas em toda a região." },
        { q: "Como envio minhas referências?", a: "Pelo WhatsApp ou E-mail. Nossa equipe ajuda a alinhar suas expectativas com a arte final." },
        { q: "Quais materiais vocês usam?", a: "Trabalhamos apenas com insumos premium de alta durabilidade, específicos para cada finalidade (interno ou externo)." },
        { q: "Emitem nota fiscal?", a: "Sim, emitimos nota fiscal para todos os serviços." },
        { q: "Vocês criam a arte?", a: "Sim! Temos um time de design focado em criar layouts profissionais e exclusivos para sua marca." },
    ];

    return (
        <section id="faq" className={styles.faq}>
            <div className={styles.container}>
                <h2 className={styles.title}>Perguntas Frequentes</h2>

                <div className={styles.accordion}>
                    {questions.map((item, index) => (
                        <div key={index} className={`${styles.item} ${openIndex === index ? styles.open : ''}`}>
                            <button className={styles.question} onClick={() => toggleFAQ(index)}>
                                {item.q}
                                <i className={`bi bi-chevron-down ${styles.icon}`}></i>
                            </button>
                            <div className={styles.answer}>
                                <div className={styles.answerContent}>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
