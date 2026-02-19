'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        wpp: '',
        service: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for submission logic
        console.log('Form submitted:', formData);
        alert('Obrigado! Entraremos em contato em breve.');
    };

    return (
        <>
            {/* Final CTA Strip */}
            <section className={styles.finalCta}>
                <div className={styles.ctaContainer}>
                    <h2>Pronto para elevar sua comunicação visual?</h2>
                    <div className={styles.ctaButtons}>
                        <Link href="https://wa.me/5527999999999" target="_blank" className={styles.whatsappBtn}>
                            <i className="bi bi-whatsapp"></i> Falar no WhatsApp
                        </Link>
                        <Link href="#contato" className={styles.formBtn}>
                            ou preencha o formulário abaixo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section id="contato" className={styles.contact}>
                <div className={styles.container}>
                    <div className={styles.infoSide}>
                        <h3>Vamos conversar</h3>
                        <p>Entre em contato e tire suas dúvidas. Estamos prontos para atender você.</p>

                        <div className={styles.infoItem}>
                            <i className="bi bi-whatsapp"></i>
                            <div>
                                <strong>WhatsApp</strong>
                                <p>(27) 99999-9999</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <i className="bi bi-envelope"></i>
                            <div>
                                <strong>E-mail</strong>
                                <p>contato@ntgrafica.com.br</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <i className="bi bi-geo-alt"></i>
                            <div>
                                <strong>Endereço</strong>
                                <p>Rua da Empresa, 123 - Bairro, Cidade - ES</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <i className="bi bi-clock"></i>
                            <div>
                                <strong>Horário</strong>
                                <p>Seg a Sex: 8h às 18h</p>
                            </div>
                        </div>

                        <div className={styles.mapPlaceholder}>
                            <span>Mapa (Google Maps Embed)</span>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h3>Solicite seu orçamento</h3>

                        <div className={styles.inputGroup}>
                            <label>Nome</label>
                            <input type="text" name="name" required placeholder="Seu nome" onChange={handleChange} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Empresa</label>
                            <input type="text" name="company" placeholder="Nome da empresa" onChange={handleChange} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>WhatsApp</label>
                            <input type="tel" name="wpp" required placeholder="(DD) 99999-9999" onChange={handleChange} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Serviço de interesse</label>
                            <select name="service" onChange={handleChange}>
                                <option value="">Selecione...</option>
                                <option value="Fachada">Fachada</option>
                                <option value="Identidade Visual">Identidade Visual (Marca/Logo)</option>
                                <option value="Adesivos">Adesivos</option>
                                <option value="Impressos">Impressos</option>
                                <option value="Banners">Banners</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Mensagem</label>
                            <textarea name="message" rows={4} placeholder="Descreva o que precisa..." onChange={handleChange}></textarea>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Enviar solicitação <i className="bi bi-send"></i>
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
