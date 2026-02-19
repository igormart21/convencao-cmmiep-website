import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="/images/logo.png"
                            alt="NT Gráfica Logo"
                            width={180}
                            height={60}
                            className={styles.footerLogo}
                        />
                    </div>
                    <p className={styles.description}>
                        Soluções completas em comunicação visual. <br />
                        Qualidade, agilidade e excelência.
                    </p>
                </div>

                <div className={styles.column}>
                    <h4>Links Rápidos</h4>
                    <ul className={styles.links}>
                        <li><Link href="#servicos">Serviços</Link></li>
                        <li><Link href="#portfolio">Portfólio</Link></li>
                        <li><Link href="#depoimentos">Depoimentos</Link></li>
                        <li><Link href="#faq">FAQ</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Contato</h4>
                    <ul className={styles.contactInfo}>
                        <li><i className="bi bi-whatsapp"></i> (27) 99999-9999</li>
                        <li><i className="bi bi-envelope"></i> contato@ntgrafica.com.br</li>
                        <li><i className="bi bi-geo-alt"></i> Endereço da Empresa, 123</li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h4>Redes Sociais</h4>
                    <div className={styles.socials}>
                        <a href="https://www.instagram.com/nt.comunicacao_?igsh=NW93b2VsZ3hwdnZo" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>&copy; {new Date().getFullYear()} NT Gráfica e Comunicação Visual. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
