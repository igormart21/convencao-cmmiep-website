import Link from 'next/link';
import styles from './Landing24h.module.css';

export default function Landing24h() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.badge}>Diferencial Exclusivo</div>
                <h2 className={styles.title}>Sua Landing Page pronta em 24 horas</h2>
                <p className={styles.description}>
                    Precisa anunciar rápido? Entregamos sua página de alta conversão de um dia para o outro.
                    Sem enrolação, com qualidade premium.
                </p>

                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>1</div>
                        <h3>Briefing Rápido</h3>
                        <p>Você nos envia as informações básicas e referências.</p>
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>2</div>
                        <h3>Desenvolvimento</h3>
                        <p>Nossa equipe cria o design e codifica a página.</p>
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.step}>
                        <div className={styles.stepNumber}>3</div>
                        <h3>Publicação</h3>
                        <p>Seu site no ar, pronto para rodar tráfego.</p>
                    </div>
                </div>

                <div className={styles.ctaWrapper}>
                    <Link href="https://wa.me/5527999999999" target="_blank" className={styles.ctaButton}>
                        Quero minha landing em 24h <i className="bi bi-arrow-right"></i>
                    </Link>
                    <p className={styles.note}>* Prazo válido após envio de materiais e aprovação do orçamento.</p>
                </div>
            </div>
        </section>
    );
}
