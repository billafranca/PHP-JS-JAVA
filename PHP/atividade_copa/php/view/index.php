<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto Copa — França 🇫🇷</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="../../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
<body>

    <!-- Grain overlay -->
    <div class="grain-overlay"></div>

    <!-- Cursor personalizado -->
    <div class="cursor" id="cursor"></div>
    <div class="cursor-ring" id="cursorRing"></div>

    <!-- ═══ HEADER ═══ -->
    <header>
        <div class="logo-nav">COPA<span>•</span>TAREFAS</div>
        <nav>
            <ul>
                <li><a href="#franca">França</a></li>
                <li><a href="#sobre-copa">Sobre</a></li>
                <li><a href="material.php">Comprar Material</a></li>
                <li><a href="#contato">Contato</a></li>
                <li><a href="../cadastro.php">Cadastrar</a></li>
            </ul>
        </nav>
    </header>

    <!-- ═══ HERO ═══ -->
    <section id="hero">
        <div class="tricolor-bg">
            <div class="band"></div>
            <div class="band"></div>
            <div class="band"></div>
        </div>

        <div class="hero-text">
            <div class="hero-eyebrow">
                <div class="flag-strip">
                    <div class="f1"></div>
                    <div class="f2"></div>
                    <div class="f3"></div>
                </div>
                <span>Sala — País França</span>
            </div>
            <h1 class="hero-title">
                Projet<em>o</em><br>
                <span class="outline">Copa</span>
            </h1>
            <p class="hero-subtitle">Tarefas &nbsp;·&nbsp; França &nbsp;·&nbsp; 2026</p>
            <p class="hero-desc">
                Um projeto que une a grandeza francesa com o espírito de equipe da nossa sala. 
                Liberdade, igualdade e muita entrega — c'est la vie escolar.
            </p>
            <div class="hero-cta">
                <a href="#sobre-copa" class="btn-primary">Ver projeto</a>
                <a href="#franca" class="btn-outline">Conhecer a França</a>
            </div>
        </div>

        <div class="hero-visual">
            <div class="eiffel-wrap">
                <!-- Torre Eiffel SVG inline -->
                <svg class="eiffel-svg" viewBox="0 0 200 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="towerGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#4a7fd4"/>
                            <stop offset="60%" stop-color="#1a3a9e"/>
                            <stop offset="100%" stop-color="#002395"/>
                        </linearGradient>
                    </defs>
                    <!-- Base -->
                    <path d="M20 400 L40 320 L160 320 L180 400 Z" fill="url(#towerGrad)" opacity="0.9"/>
                    <!-- Arcos base -->
                    <path d="M20 400 Q100 370 180 400" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none"/>
                    <!-- Pés -->
                    <rect x="35" y="390" width="18" height="12" rx="2" fill="#001a7a"/>
                    <rect x="147" y="390" width="18" height="12" rx="2" fill="#001a7a"/>
                    <!-- Seção 1 -->
                    <path d="M40 320 L60 230 L140 230 L160 320 Z" fill="url(#towerGrad)" opacity="0.92"/>
                    <!-- Plataforma 1 -->
                    <rect x="50" y="226" width="100" height="8" rx="2" fill="#1a3a9e"/>
                    <!-- Seção 2 -->
                    <path d="M60 226 L75 155 L125 155 L140 226 Z" fill="url(#towerGrad)" opacity="0.94"/>
                    <!-- Plataforma 2 -->
                    <rect x="68" y="151" width="64" height="7" rx="2" fill="#1a3a9e"/>
                    <!-- Seção 3 -->
                    <path d="M76 151 L88 90 L112 90 L124 151 Z" fill="url(#towerGrad)" opacity="0.97"/>
                    <!-- Topo -->
                    <path d="M88 90 L96 20 L104 20 L112 90 Z" fill="#4a7fd4"/>
                    <!-- Antena -->
                    <rect x="99" y="4" width="2" height="20" rx="1" fill="var(--gold)"/>
                    <!-- Luz antena -->
                    <circle cx="100" cy="4" r="3" fill="var(--rouge)" opacity="0.9">
                        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Treliças horizontais -->
                    <line x1="45" y1="280" x2="155" y2="280" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
                    <line x1="50" y1="260" x2="150" y2="260" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                    <line x1="65" y1="200" x2="135" y2="200" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
                    <line x1="78" y1="130" x2="122" y2="130" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
                    <!-- Detalhes treliça diagonal -->
                    <line x1="40" y1="320" x2="100" y2="280" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
                    <line x1="160" y1="320" x2="100" y2="280" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
                </svg>
                <div class="glow-circle"></div>
            </div>

            <div class="stars-badge">
                <div class="star-row">★ ★</div>
                <div class="star-label">Campeã 1998 · 2018</div>
            </div>
        </div>

        <div class="scroll-hint">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    <div class="divider-tricolor">
        <div class="d1"></div>
        <div class="d2"></div>
        <div class="d3"></div>
    </div>

    <!-- ═══ SOBRE O PROJETO ═══ -->
    <section id="sobre-copa">
        <div class="section-label">O projeto</div>
        <h2 class="section-title">Tudo que você precisa<br>saber sobre a <em>Copa Tarefas</em></h2>

        <div class="cards-grid">
            <div class="card-item">
                <div class="card-num">01</div>
                <div class="card-icon">🎯</div>
                <h3 class="card-title">Objetivo</h3>
                <p class="card-text">Cada sala representa um país e compete por pontos através do cumprimento de tarefas e metas ao longo do ano. Nossa sala é a <strong style="color:var(--blanc)">França</strong>.</p>
            </div>
            <div class="card-item">
                <div class="card-num">02</div>
                <div class="card-icon">📋</div>
                <h3 class="card-title">Tarefas</h3>
                <p class="card-text">As atividades variam entre entregas individuais e coletivas, cada uma valendo pontos no placar geral da competição escolar.</p>
            </div>
            <div class="card-item">
                <div class="card-num">03</div>
                <div class="card-icon">🏆</div>
                <h3 class="card-title">Premiação</h3>
                <p class="card-text">A sala com maior pontuação no fim do período é coroada campeã da Copa Tarefas — a glória é nossa, comme toujours.</p>
            </div>
        </div>
    </section>

    <div class="divider-tricolor">
        <div class="d1"></div>
        <div class="d2"></div>
        <div class="d3"></div>
    </div>

    <!-- ═══ FRANÇA ═══ -->
    <section id="franca">
        <div class="section-label">Notre pays</div>
        <h2 class="section-title">Vive la <em>France</em></h2>

        <div class="franca-layout">
            <div class="franca-facts">
                <div class="fact-item">
                    <div class="fact-emoji">🗼</div>
                    <div class="fact-content">
                        <h4>Torre Eiffel</h4>
                        <p>Símbolo maior de Paris e do país. Construída em 1889, recebe mais de 7 milhões de visitantes por ano — é o monumento mais visitado do mundo.</p>
                    </div>
                </div>
                <div class="fact-item">
                    <div class="fact-emoji">⚽</div>
                    <div class="fact-content">
                        <h4>Bicampeã Mundial</h4>
                        <p>A França conquistou a Copa do Mundo da FIFA em 1998 (em casa) e em 2018, com uma geração liderada por Kylian Mbappé. Les Bleus forever.</p>
                    </div>
                </div>
                <div class="fact-item">
                    <div class="fact-emoji">🥐</div>
                    <div class="fact-content">
                        <h4>Capital da Gastronomia</h4>
                        <p>Da croissant ao coq au vin, a culinária francesa é Patrimônio Imaterial da Humanidade pela UNESCO desde 2010.</p>
                    </div>
                </div>
                <div class="fact-item">
                    <div class="fact-emoji">🎨</div>
                    <div class="fact-content">
                        <h4>Arte & Cultura</h4>
                        <p>O Louvre, o maior museu do mundo, fica em Paris. A França deu ao mundo Monet, Proust, Camus e a liberdade de expressão como ideal universal.</p>
                    </div>
                </div>
            </div>

            <div class="quote-block">
                <p class="quote-text">
                    Liberté, Égalité, Fraternité — e também muita entrega de tarefa no prazo.
                </p>
                <p class="quote-author">— Motto da nossa sala, 2025</p>

                <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08);">
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-top: 0;">
                        <div>
                            <div style="font-family:'Bebas Neue',sans-serif; font-size:2.2rem; color:var(--blanc); line-height:1;">67M</div>
                            <div style="font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-top:0.2rem;">Habitantes</div>
                        </div>
                        <div>
                            <div style="font-family:'Bebas Neue',sans-serif; font-size:2.2rem; color:var(--blanc); line-height:1;">2×</div>
                            <div style="font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-top:0.2rem;">Campeã mundial</div>
                        </div>
                        <div>
                            <div style="font-family:'Bebas Neue',sans-serif; font-size:2.2rem; color:var(--blanc); line-height:1;">1er</div>
                            <div style="font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-top:0.2rem;">País mais visitado</div>
                        </div>
                        <div>
                            <div style="font-family:'Bebas Neue',sans-serif; font-size:2.2rem; color:var(--blanc); line-height:1;">1789</div>
                            <div style="font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-top:0.2rem;">Revolução Francesa</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="divider-tricolor">
        <div class="d1"></div>
        <div class="d2"></div>
        <div class="d3"></div>
    </div>

    <!-- ═══ CONTATO ═══ -->
    <section id="contato">
        <div class="section-label">Contato</div>
        <h2 class="section-title">Fale com<br>a <em>equipe</em></h2>

        <div class="contato-grid">
            <div>
                <div class="form-group">
                    <label>Nome completo</label>
                    <input type="text" placeholder="Seu nome">
                </div>
                <div class="form-group">
                    <label>E-mail</label>
                    <input type="email" placeholder="seu@email.com">
                </div>
                <div class="form-group">
                    <label>Mensagem</label>
                    <textarea placeholder="Escreva sua mensagem aqui..."></textarea>
                </div>
                <button class="btn-primary" style="border:none; cursor:none;">Enviar mensagem</button>
            </div>

            <div class="contact-info">
                <div>
                    <p style="font-family:'Playfair Display',serif; font-size:1.1rem; color:var(--blanc); margin-bottom:1.5rem;">
                        Dúvidas sobre o projeto? Quer saber mais sobre a competição? 
                        Estamos aqui.
                    </p>
                </div>
                <div class="contact-line">
                    <div class="icon">📍</div>
                    <span>Escola — Nossa Sala, Paris do Brasil</span>
                </div>
                <div class="contact-line">
                    <div class="icon">📘</div>
                    <span>Projeto Copa Tarefas — Turma França</span>
                </div>
                <div class="contact-line">
                    <div class="icon">🗓️</div>
                    <span>Prazo de entrega: conforme cronograma</span>
                </div>
                <div style="margin-top: 1rem;">
                    <div class="flag-strip" style="width:72px; height:42px; border-radius:6px; box-shadow: 0 6px 24px rgba(0,0,0,0.4);">
                        <div class="f1"></div>
                        <div class="f2"></div>
                        <div class="f3"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <footer>
        <div class="footer-logo">COPA<span>•</span>TAREFAS</div>
        <p class="footer-copy">Projeto escolar · Sala França · 2025</p>
        <div class="footer-flag">
            <div class="flag-strip">
                <div class="f1"></div>
                <div class="f2"></div>
                <div class="f3"></div>
            </div>
            <span style="font-size:0.75rem; color:rgba(255,255,255,0.25); margin-left:0.5rem;">🇫🇷</span>
        </div>
    </footer>

    <script>
        // Cursor
        const cursor = document.getElementById('cursor');
        const cursorRing = document.getElementById('cursorRing');
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cursor.style.left = mx - 6 + 'px';
            cursor.style.top  = my - 6 + 'px';
        });

        function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            cursorRing.style.left = rx - 18 + 'px';
            cursorRing.style.top  = ry - 18 + 'px';
            requestAnimationFrame(animRing);
        }
        animRing();

        document.querySelectorAll('a, button, .card-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursorRing.style.transform = 'scale(1.5)';
                cursorRing.style.opacity = '0.3';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorRing.style.transform = 'scale(1)';
                cursorRing.style.opacity = '0.6';
            });
        });

        // Scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeUp 0.8s ease both';
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card-item, .fact-item, .quote-block').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    </script>
</body>
</html>
