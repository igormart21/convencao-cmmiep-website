import styles from './Benefits.module.css';

export default function Benefits() {
    return (
        <section className={styles.benefits}>
            <div className={styles.container}>
                <div className={styles.visual}>
                    {/* Placeholder for Benefits Image */}
                    <div className={styles.imagePlaceholder}>
                        <i className="bi bi-shield-check"></i>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.label}>Por que escolher a NT?</div>
                    <h2 className={styles.title}>Qualidade, Agilidade e Confiança.</h2>
                    <p className={styles.description}>
                        Entregamos mais do que impressos. Entregamos soluções que valorizam sua marca e atraem clientes.
                    </p>

                    <ul className={styles.list}>
                        <li>
                            <i className="bi bi-check-circle-fill"></i>
                            <div>
                                <strong>Prazo e Previsibilidade</strong>
                                <p>Cumprimos prazos rigorosamente para você não parar.</p>
                            </div>
                        </li>
                        <li>
                            <i className="bi bi-check-circle-fill"></i>
                            <div>
                                <strong>Acabamento Profissional</strong>
                                <p>Materiais de primeira linha e corte preciso.</p>
                            </div>
                        </li>
                        <li>
                            <i className="bi bi-check-circle-fill"></i>
                            <div>
                                <strong>Equipe Especializada</strong>
                                <p>Profissionais com anos de experiência no mercado.</p>
                            </div>
                        </li>
                        <li>
                            <i className="bi bi-check-circle-fill"></i>
                            <div>
                                <strong>Soluções Completas</strong>
                                <p>Do design à instalação, cuidamos de tudo.</p>
                            </div>
                        </li>
                    </ul>

                    <div className={styles.chips}>
                        <span><i className="bi bi-stopwatch"></i> Orçamento rápido</span>
                        <span><i className="bi bi-person-check"></i> Acompanhamento</span>
                        <span><i className="bi bi-star"></i> Padrão Premium</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
