import styles from './Process.module.css';

export default function Process() {
    const steps = [
        { num: 1, title: 'Contato', desc: 'Solicite seu orçamento via WhatsApp e envie suas ideias.' },
        { num: 2, title: 'Aprovação', desc: 'Validamos medidas e artes para garantir a qualidade.' },
        { num: 3, title: 'Produção', desc: 'Fabricação com materiais premium e tecnologia de ponta.' },
        { num: 4, title: 'Entrega', desc: 'Instalação profissional ou retirada em nossa sede.' }
    ];

    return (
        <section id="como-funciona" className={styles.process}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Como Funciona</h2>
                    <p className={styles.subtitle}>Do pedido à entrega, um processo transparente e ágil.</p>
                </div>

                <div className={styles.timeline}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.circle}>{step.num}</div>
                            <div className={styles.content}>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                            {index < steps.length - 1 && <div className={styles.line}></div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
