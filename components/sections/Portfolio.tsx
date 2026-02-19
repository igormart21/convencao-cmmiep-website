'use client';
import { useState } from 'react';
import styles from './Portfolio.module.css';

export default function Portfolio() {
    const [filter, setFilter] = useState('todos');

    const categories = [
        { id: 'todos', name: 'Todos' },
        { id: 'fachadas', name: 'Fachadas' },
        { id: 'adesivos', name: 'Adesivos' },
        { id: 'placas', name: 'Placas' },
        { id: 'impressos', name: 'Impressos' }
    ];

    // Mock data - In real app, these would be images
    const items = [
        { id: 1, category: 'fachadas', title: "Fachada Loja X" },
        { id: 2, category: 'adesivos', title: "Adesivo Vitrine Y" },
        { id: 3, category: 'placas', title: "Sinalização Interna" },
        { id: 4, category: 'fachadas', title: "Letreiro Iluminado" },
        { id: 5, category: 'impressos', title: "Cartão de Visita Premium" },
        { id: 6, category: 'adesivos', title: "Envelopamento Frota" },
        { id: 7, category: 'placas', title: "Placa de Obra" },
        { id: 8, category: 'impressos', title: "Folder Promocional" },
    ];

    const filteredItems = filter === 'todos'
        ? items
        : items.filter(item => item.category === filter);

    return (
        <section id="portfolio" className={styles.portfolio}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Nosso Portfólio</h2>
                    <p className={styles.subtitle}>Confira alguns de nossos trabalhos recentes.</p>

                    <div className={styles.filters}>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.filterBtn} ${filter === cat.id ? styles.active : ''}`}
                                onClick={() => setFilter(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.grid}>
                    {filteredItems.map(item => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.imagePlaceholder}>
                                <span>{item.title}</span>
                            </div>
                            <div className={styles.overlay}>
                                <i className="bi bi-zoom-in"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
