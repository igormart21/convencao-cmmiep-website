import Link from 'next/link';
import styles from './Topbar.module.css';

export default function Topbar() {
    return (
        <div className={styles.topbar}>
            <div className={styles.container}>
                <p className={styles.text}>
                    ⚡ Entrega rápida • Atendimento via WhatsApp • Orçamento ágil
                </p>
                <Link href="https://wa.me/5527999999999" target="_blank" className={styles.button}>
                    Falar agora
                </Link>
            </div>
        </div>
    );
}
