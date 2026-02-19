import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        🎨 Especialistas em Comunicação Visual
                    </div>
                    <h1 className={styles.headline}>
                        Sua Marca em Evidência com <span className={styles.highlight}>Qualidade Premium</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Da criação da identidade visual à impressão final. A NT Gráfica entrega soluções completas para destacar sua empresa no mercado.
                    </p>

                    <div className={styles.ctaGroup}>
                        <Link href="https://wa.me/5527999999999" target="_blank" className={styles.primaryBtn}>
                            <i className="bi bi-whatsapp"></i> Falar com Especialista
                        </Link>
                        <Link href="#portfolio" className={styles.secondaryBtn}>
                            Ver Portfólio
                        </Link>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <i className="bi bi-brush-fill"></i>
                            <span>Design Exclusivo</span>
                        </div>
                        <div className={styles.statItem}>
                            <i className="bi bi-printer-fill"></i>
                            <span>Impressão HD</span>
                        </div>
                        <div className={styles.statItem}>
                            <i className="bi bi-lightning-charge-fill"></i>
                            <span>Entrega Ágil</span>
                        </div>
                    </div>
                </div>

                <div className={styles.visual}>
                    {/* Abstract visual representation */}
                    <div className={styles.blob}></div>
                    <div className={styles.cardVisual}>
                        <div className={styles.fakeCard}>
                            <i className="bi bi-bezier2"></i>
                            <span>Identidade Visual</span>
                        </div>
                        <div className={styles.fakeCard + ' ' + styles.cardTwo}>
                            <i className="bi bi-layers-fill"></i>
                            <span>Material Gráfico</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.waveDivider}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shapeFill}></path>
                </svg>
            </div>
        </section>
    );
}
