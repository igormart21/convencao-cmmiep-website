import styles from './Services.module.css';

export default function Services() {
    const services = [
        {
            title: "Comunicação Visual",
            icon: "bi-megaphone",
            desc: "Placas em lona, Acm, Adesivo em qualidade Latéx (melhor durabilidade do mercado), fachada, totens, luminosos, PVC adesivado, PVC expandido."
        },
        {
            title: "Gráfica",
            icon: "bi-printer",
            desc: "Cartões de visita, folders, panfletos, encartes, banners, impressões A1, Wind banner, rótulos, recorte a laser, adesivos e outros..."
        },
        {
            title: "Projetos e Design",
            icon: "bi-palette",
            desc: "Desenvolvemos toda parte gráfica e de designer do zero para o cliente. Criação de marcas, fachadas, comunicação interna e projetos completos."
        }
    ];

    return (
        <section id="servicos" className={styles.services}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>O que fazemos</h2>
                    <p className={styles.subtitle}>Soluções completas para destacar sua marca no mundo físico.</p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                <i className={`bi ${service.icon}`}></i>
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDesc}>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
