import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/logo.png"
                        alt="NT Gráfica Logo"
                        style={{ height: '48px', width: 'auto', display: 'block' }}
                    />
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="#servicos">Serviços</Link></li>
                        <li><Link href="#portfolio">Portfólio</Link></li>
                        <li><Link href="#como-funciona">Como funciona</Link></li>
                        <li><Link href="#depoimentos">Depoimentos</Link></li>
                        <li><Link href="#faq">FAQ</Link></li>
                        <li><Link href="#contato">Contato</Link></li>
                    </ul>
                </nav>

                <Link href="https://wa.me/5527999999999" target="_blank" className={styles.ctaButton}>
                    Orçar no WhatsApp
                </Link>
            </div>
        </header>
    );
}
