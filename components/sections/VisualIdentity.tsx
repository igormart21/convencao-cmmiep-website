import Link from 'next/link';
import styles from './VisualIdentity.module.css';

export default function VisualIdentity() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.badge}>Destaque sua Marca</div>
                <h2 className={styles.title}>Identidade Visual que Vende</h2>
                <p className={styles.description}>
                    Não basta imprimir, é preciso comunicar. Criamos e renovamos a identidade visual da sua empresa
                    para transmitir profissionalismo e atrair mais clientes.
                </p>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <div className={styles.iconBox}><i className="bi bi-vector-pen"></i></div>
                        <h3>Criação de Logos</h3>
                        <p>Marcas memoráveis e versáteis para qualquer aplicação.</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.iconBox}><i className="bi bi-palette"></i></div>
                        <h3>Paleta de Cores</h3>
                        <p>Definição estratégica de cores que conectam com seu público.</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.iconBox}><i className="bi bi-file-earmark-richtext"></i></div>
                        <h3>Papelaria Completa</h3>
                        <p>Cartões, timbrados e pastas com a cara do seu negócio.</p>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.iconBox}><i className="bi bi-aspect-ratio"></i></div>
                        <h3>Social Media</h3>
                        <p>Templates e banners para manter sua presença digital forte.</p>
                    </div>
                </div>

                <div className={styles.ctaWrapper}>
                    <Link href="https://wa.me/5527999999999" target="_blank" className={styles.ctaButton}>
                        Quero renovar minha marca <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
