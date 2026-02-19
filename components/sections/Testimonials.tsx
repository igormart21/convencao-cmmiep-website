import styles from './Testimonials.module.css';

export default function Testimonials() {
    const reviews = [
        { name: "João Silva", company: "Empresa X", text: "Atendimento impecável e entrega antes do prazo. Recomendo muito!" },
        { name: "Maria Oliveira", company: "Loja Y", text: "A qualidade da impressão superou nossas expectativas. Muito obrigada!" },
        { name: "Pedro Santos", company: "Startup Z", text: "Fizeram nossa fachada e ficou incrível. Ótimo custo-benefício." }
    ];

    return (
        <section id="depoimentos" className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>O que dizem sobre nós</h2>
                    <div className={styles.stars}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <span>4.9/5</span>
                    </div>
                </div>

                <div className={styles.grid}>
                    {reviews.map((review, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.quoteIcon}><i className="bi bi-quote"></i></div>
                            <p className={styles.text}>"{review.text}"</p>
                            <div className={styles.author}>
                                <strong>{review.name}</strong>
                                <span>{review.company}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
