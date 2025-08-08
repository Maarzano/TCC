import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import LandingNav from "../../Components/Navs/LandingNav";
import iconBox from "../../Assets/SVGs/Icons/icon-box.svg";
import iconCart from "../../Assets/SVGs/Icons/icon-cart-black.svg";
import iconHistory from "../../Assets/SVGs/Icons/icon-history.svg";
import iconEmployees from "../../Assets/SVGs/Icons/icon-employes.svg";
import iconCloud from "../../Assets/SVGs/Icons/icon-cloud.svg";
import iconGoogle from "../../Assets/SVGs/Icons/icon-google-color.svg";
import iconStockfy from "../../Assets/SVGs/Icons/stock-svgrepo-com.png";
import inoDevIcon from "../../Assets/SVGs/Icons/InoDev.png";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Landing = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);

  // FAQ Data and logic
  const faqData = [
    {
      question: "Preciso instalar algum programa para usar o Stockfy?",
      answer: "Não! O Stockfy é 100% online, basta acessar pelo navegador e começar a usar. Nenhuma instalação é necessária.",
    },
    {
      question: "Meus dados ficam seguros na plataforma?",
      answer: "Sim, todos os dados são criptografados e armazenados em servidores seguros com backup automático na nuvem.",
    },
    {
      question: "Consigo exportar relatórios para Excel?",
      answer: "Sim! Você pode exportar todo o histórico de movimentações e inventário para Excel com apenas um clique.",
    },
    {
      question: "Posso cadastrar vários usuários e controlar permissões?",
      answer: "Claro! O Stockfy permite múltiplos usuários com diferentes níveis de acesso e permissões personalizadas.",
    },
    {
      question: "O sistema funciona em dispositivos móveis?",
      answer: "Sim, o Stockfy é totalmente responsivo e funciona perfeitamente em celulares, tablets e computadores.",
    },
    {
      question: "Como funciona o suporte ao cliente?",
      answer: "Oferecemos suporte via chat, e-mail e uma central de ajuda completa para tirar todas as suas dúvidas rapidamente.",
    },
  ];
  const [openFAQ, setOpenFAQ] = useState(null);
  const handleToggleFAQ = idx => setOpenFAQ(openFAQ === idx ? null : idx);

  const features = [
    {
      icon: iconBox,
      title: "Gestão de Estoque",
      description: "Controle total do inventário, cadastro, edição e exclusão de produtos de forma intuitiva."
    },
    {
      icon: iconCart,
      title: "Carrinho Inteligente",
      description: "Movimente itens do estoque facilmente com o carrinho persistente e rápido."
    },
    {
      icon: iconGoogle,
      title: "Login com Google",
      description: "Acesse rapidamente com sua conta Google, sem complicação."
    },
    {
      icon: iconHistory,
      title: "Histórico & Excel",
      description: "Veja todo o histórico e exporte relatórios detalhados para Excel com 1 clique."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const fakeComments = [
    {
      name: "Ana Souza",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment: "O Stockfy revolucionou o controle do nosso estoque! Interface intuitiva e suporte excelente.",
    },
    {
      name: "Carlos Lima",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      comment: "Muito prático e fácil de usar. Recomendo para qualquer empresa!",
    },
    {
      name: "Juliana Alves",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      comment: "A integração com a equipe foi perfeita. O sistema é rápido e seguro.",
    },
    {
      name: "Roberto Silva",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      rating: 5,
      comment: "Nunca mais perdemos produtos por falta de controle. O histórico é sensacional!",
    },
    {
      name: "Fernanda Dias",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 4,
      comment: "O design é lindo e a navegação super fluida. Parabéns à equipe!",
    },
    {
      name: "Lucas Pereira",
      avatar: "https://randomuser.me/api/portraits/men/23.jpg",
      rating: 5,
      comment: "A função de exportar para Excel salvou minha vida! Muito útil.",
    },
    {
      name: "Marina Costa",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 5,
      comment: "O melhor sistema de estoque que já usei. Simplesmente perfeito!",
    },
    {
      name: "Eduardo Ramos",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 4,
      comment: "O suporte técnico é muito ágil. Resolveram meu problema em minutos.",
    },
    {
      name: "Patrícia Santos",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 5,
      comment: "A gestão de funcionários é incrível. Cada um com suas permissões específicas.",
    },
    {
      name: "Thiago Oliveira",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 5,
      comment: "O carrinho de movimentação é genial! Facilita muito o dia a dia.",
    },
    {
      name: "Camila Ferreira",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg",
      rating: 4,
      comment: "Interface moderna e responsiva. Funciona perfeitamente no mobile.",
    },
    {
      name: "Rafael Martins",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      comment: "O backup automático na nuvem me dá total segurança. Recomendo!",
    },
    {
      name: "Isabela Rodrigues",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      comment: "Relatórios detalhados e exportação para Excel. Exatamente o que precisava!",
    },
    {
      name: "Gabriel Almeida",
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      rating: 4,
      comment: "Sistema robusto e confiável. Não tive problemas desde que comecei a usar.",
    },
    {
      name: "Larissa Costa",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg",
      rating: 5,
      comment: "A busca e filtros são muito eficientes. Encontro qualquer produto rapidamente.",
    },
    {
      name: "Diego Santos",
      avatar: "https://randomuser.me/api/portraits/men/34.jpg",
      rating: 5,
      comment: "O histórico de movimentações é completo. Nunca perco o controle de nada.",
    },
  ];

  // Remover bentoLayout e grid customizado



  // Scroll-to-top button logic
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <LandingNav />

      {/* Hero Section */}
      <HeroSection>
        <HeroBgDecor />
        <HeroContent>
          <Badge>🔥 Novo em 2025</Badge>
          <HeroTitle>
            <span>Sistema Completo de</span>
            <Highlight> Gestão de Estoque</Highlight>
          </HeroTitle>
          <HeroSubtitle>
            <span style={{fontWeight:600, color:'#fff', fontSize:'1.35rem'}}>Transforme o controle do seu estoque em uma experiência moderna, visual e inteligente.</span>
            <br />
            <span style={{color:'#a084ff'}}>Automatize processos, reduza erros e ganhe tempo com o Stockfy.</span>
          </HeroSubtitle>
          <CTAButtons>
            <PrimaryButton onClick={handleGetStarted}>
              <GoogleIcon src={iconStockfy} alt="Stockfy" />
              Começar Agora
              <PulseDot />
            </PrimaryButton>
          </CTAButtons>
        </HeroContent>
        <HeroVisual>
          <MockupSVG viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" r="80" fill="#7c5cff22" />
            <rect x="40" y="60" width="100" height="60" rx="16" fill="#fff" fillOpacity="0.13" />
            <rect x="60" y="80" width="60" height="20" rx="6" fill="#a084ff" fillOpacity="0.25" />
          </MockupSVG>
          <FloatingCard style={{zIndex:2}}>
            <CardIcon src={iconBox} alt="Estoque" />
            <CardTitle>Estoque</CardTitle>
            <CardCount>1,247 itens</CardCount>
          </FloatingCard>
          <FloatingCard delay="0.5s" style={{zIndex:2}}>
            <CardIcon src={iconCart} alt="Carrinho" />
            <CardTitle>Carrinho</CardTitle>
            <CardCount>12 itens</CardCount>
          </FloatingCard>
          <FloatingCard delay="1s" style={{zIndex:2}}>
            <CardIcon src={iconEmployees} alt="Funcionários" />
            <CardTitle>Equipe</CardTitle>
            <CardCount>8 membros</CardCount>
          </FloatingCard>
        </HeroVisual>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection id="features">
        <SectionTitle>Funcionalidades Principais</SectionTitle>
        <FeaturesRow>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon src={feature.icon} alt={feature.title} />
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesRow>
      </FeaturesSection>

      {/* Comments Section */}
      <CommentsSection id="comentarios">
        <CommentsTitle>O que estão dizendo sobre o Stockfy</CommentsTitle>
        <CommentsDoubleCarousel>
          <CommentsCarouselRow $variant={1}>
            <CommentsCarouselScroller $reverse={false}>
              {[...fakeComments, ...fakeComments].map((c, i) => (
                <CommentCarouselCard key={i} $variant={1}>
                  <CommentHeader>
                    <Avatar src={c.avatar} alt={c.name} />
                    <div>
                      <CommentName>{c.name}</CommentName>
                      <CommentStars>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} $active={idx < c.rating}>★</Star>
                        ))}
                      </CommentStars>
                    </div>
                  </CommentHeader>
                  <CommentText>"{c.comment}"</CommentText>
                </CommentCarouselCard>
              ))}
            </CommentsCarouselScroller>
          </CommentsCarouselRow>
          <CommentsCarouselRow $variant={2}>
            <CommentsCarouselScroller $reverse={true}>
              {[...fakeComments, ...fakeComments].map((c, i) => (
                <CommentCarouselCard key={i} $variant={2}>
                  <CommentHeader>
                    <Avatar src={c.avatar} alt={c.name} />
                    <div>
                      <CommentName>{c.name}</CommentName>
                      <CommentStars>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} $active={idx < c.rating}>★</Star>
                        ))}
                      </CommentStars>
                    </div>
                  </CommentHeader>
                  <CommentText>"{c.comment}"</CommentText>
                </CommentCarouselCard>
              ))}
            </CommentsCarouselScroller>
          </CommentsCarouselRow>
        </CommentsDoubleCarousel>
      </CommentsSection>

      {/* Benefits Section */}
      <BenefitsSection id="benefits">
        <SectionTitle>Por que escolher o Stockfy?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon src={iconCloud} alt="Cloud" />
            <BenefitTitle>Armazenamento Seguro</BenefitTitle>
            <BenefitDescription>
              Seus dados ficam protegidos na nuvem com backup automático e sincronização em tempo real.
            </BenefitDescription>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon src={iconHistory} alt="Histórico" />
            <BenefitTitle>Histórico Completo</BenefitTitle>
            <BenefitDescription>
              Acompanhe todas as movimentações com relatórios detalhados e exportação para Excel.
            </BenefitDescription>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon src={iconEmployees} alt="Equipe" />
            <BenefitTitle>Gestão de Equipe</BenefitTitle>
            <BenefitDescription>
              Controle de acesso por usuário com permissões personalizadas para cada funcionário.
            </BenefitDescription>
          </BenefitCard>
        </BenefitsGrid>
      </BenefitsSection>

      {/* CTA Section */}
      <CTASection id="contact">
        <CTAContent>
          <CTATitle>Pronto para otimizar seu estoque?</CTATitle>
          <CTASubtitle>
            Junte-se a centenas de empresas que já confiam no Stockfy para gerenciar seus inventários.
          </CTASubtitle>
          <CTAButton onClick={handleGetStarted}>
            <GoogleIcon src={iconGoogle} alt="Google" />
            Começar Gratuitamente
          </CTAButton>
        </CTAContent>
      </CTASection>

      {/* FAQ Section */}
      <FAQSection id="faq">
        <FAQTitle>Perguntas Frequentes</FAQTitle>
        <FAQList>
          {faqData.map((item, idx) => (
            <FAQItem key={idx}>
              <FAQQuestion onClick={() => handleToggleFAQ(idx)} $open={openFAQ === idx}>
                {item.question}
                <FAQArrow $open={openFAQ === idx}>▼</FAQArrow>
              </FAQQuestion>
              <FAQAnswer $open={openFAQ === idx}>{item.answer}</FAQAnswer>
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>

      {/* Scroll To Top Button */}
      <ScrollTopButton onClick={handleScrollTop} $show={showScrollTop} aria-label="Voltar ao topo">
        <ScrollTopIcon viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="15" fill="#7c5cff" fillOpacity="0.18" />
          <path d="M16 22V10" stroke="#a084ff" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M10 16L16 10L22 16" stroke="#a084ff" strokeWidth="2.5" strokeLinecap="round"/>
        </ScrollTopIcon>
      </ScrollTopButton>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>Stockfy</FooterTitle>
            <FooterDescription>
              Sistema completo de gestão de estoque para empresas que buscam eficiência e controle total.<br/>
              <b>Email:</b> <FooterLink href="mailto:Stockfy269@gmail.com">
                <FooterIcon viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="4" fill="#a084ff" fillOpacity="0.18"/>
                  <path d="M4 6.5L10 11L16 6.5" stroke="#a084ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="4" y="6.5" width="12" height="7" rx="2" stroke="#a084ff" strokeWidth="1.5"/>
                </FooterIcon>
                Stockfy269@gmail.com
              </FooterLink>
            </FooterDescription>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Funcionalidades</FooterTitle>
            <FooterLinks>
              <FooterLink>Gestão de Estoque</FooterLink>
              <FooterLink>Sistema de Carrinho</FooterLink>
              <FooterLink>Histórico de Movimentações</FooterLink>
              <FooterLink>Gestão de Funcionários</FooterLink>
            </FooterLinks>
          </FooterSection>
          <FooterSection>
            <FooterTitle>Sobre</FooterTitle>
            <FooterLinks>
              <FooterLink href="https://github.com/InoD3v" target="_blank" rel="noopener noreferrer">
                <FooterIcon viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="4" fill="#a084ff" fillOpacity="0.18"/>
                  <path d="M10 2C5.58 2 2 5.58 2 10c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 18 10c0-4.42-3.58-8-8-8z" fill="#a084ff"/>
                </FooterIcon>
                GitHub InoDev
              </FooterLink>
              <FooterLink as="span" style={{display:'flex',alignItems:'center',gap:'7px'}}>
                <img src={inoDevIcon} alt="InoDev" style={{width:20,height:20,marginRight:4,verticalAlign:'middle'}} />
                Projeto da empresa <b>InoDev</b>
              </FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterContent>
        <FooterBottom>
          <FooterText>&copy; 2024 Stockfy. Todos os direitos reservados. | Projeto da empresa InoDev</FooterText>
        </FooterBottom>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
`;



const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 140px;
  padding: 120px 0 60px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    gap: 48px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 100px 10px 40px;
    text-align: center;
    gap: 32px;
  }
`;

// Scroll To Top Button styled-components
const ScrollTopButton = styled.button`
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 100;
  background: rgba(124,92,255,0.18);
  border: 2.5px solid #a084ff55;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px 0 rgba(124,92,255,0.13);
  cursor: pointer;
  opacity: ${({ $show }) => $show ? 1 : 0};
  pointer-events: ${({ $show }) => $show ? 'auto' : 'none'};
  transition: opacity 0.35s, box-shadow 0.2s, background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #7c5cff 60%, #a084ff 100%);
    box-shadow: 0 12px 32px 0 rgba(124,92,255,0.22);
    border-color: #a084ff;
  }
  @media (max-width: 600px) {
    left: 12px;
    bottom: 12px;
    width: 44px;
    height: 44px;
  }
`;

const ScrollTopIcon = styled.svg`
  width: 32px;
  height: 32px;
  display: block;
  pointer-events: none;
  @media (max-width: 600px) {
    width: 24px;
    height: 24px;
  }
`;

const HeroBgDecor = styled.div`
  position: absolute;
  top: -120px;
  left: -120px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at 60% 40%, #7c5cff55 0%, #a084ff22 60%, transparent 100%);
  filter: blur(60px);
  z-index: 0;
  pointer-events: none;
  @media (max-width: 900px) {
    width: 350px;
    height: 350px;
    top: -60px;
    left: -60px;
  }
`;

const Badge = styled.div`
  display: inline-block;
  background: linear-gradient(90deg, #ffb347, #ff5e62);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 6px 18px;
  border-radius: 20px;
  margin-bottom: 18px;
  box-shadow: 0 2px 12px #ffb34744;
  letter-spacing: 0.5px;
  z-index: 2;
`;

const PulseDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-left: 8px;
  border-radius: 50%;
  background: #ffb347;
  box-shadow: 0 0 0 0 #ffb34744;
  animation: ${pulse} 1.2s infinite;
`;

const MockupSVG = styled.svg`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 340px;
  height: 340px;
  z-index: 1;
  opacity: 0.7;
  pointer-events: none;
  @media (max-width: 900px) {
    width: 200px;
    height: 200px;
  }
`;

const HeroContent = styled.div`
  max-width: 600px;
  animation: ${fadeInUp} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, #7c5cff, #a084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #cccccc;
  margin-bottom: 40px;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 36px;
  background: linear-gradient(90deg, #7c5cff, #a084ff 80%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.18rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 18px rgba(124, 92, 255, 0.32);
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2.2s infinite;

  &:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 8px 28px rgba(124, 92, 255, 0.45);
    background: linear-gradient(90deg, #a084ff, #7c5cff 80%);
  }
`;

const SecondaryButton = styled.button`
  padding: 15px 30px;
  background: transparent;
  color: #7c5cff;
  border: 2px solid #7c5cff;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #7c5cff;
    color: white;
  }
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const FAQSection = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0 80px 0;
  background: none;
`;
const FAQTitle = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 38px;
  background: linear-gradient(45deg, #7c5cff, #a084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  max-width: 700px;
`;
const FAQItem = styled.div`
  background: rgba(255,255,255,0.06);
  border-radius: 18px;
  border: 1.5px solid #a084ff33;
  box-shadow: 0 2px 12px 0 rgba(124,92,255,0.08);
  overflow: hidden;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 28px 0 rgba(124,92,255,0.13);
    border-color: #a084ff;
  }
`;
const FAQQuestion = styled.button`
  width: 100%;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1.18rem;
  font-weight: 600;
  text-align: left;
  padding: 24px 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
  background: ${({ $open }) => $open ? 'rgba(124,92,255,0.10)' : 'none'};
`;
const FAQArrow = styled.span`
  font-size: 1.3rem;
  margin-left: 18px;
  transition: transform 0.3s;
  transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'};
`;
const FAQAnswer = styled.div`
  max-height: ${({ $open }) => $open ? '400px' : '0'};
  opacity: ${({ $open }) => $open ? 1 : 0};
  padding: ${({ $open }) => $open ? '0 32px 22px 32px' : '0 32px'};
  color: #cccccc;
  font-size: 1.05rem;
  line-height: 1.6;
  background: none;
  transition: max-height 0.35s cubic-bezier(.4,1.3,.6,1), opacity 0.25s, padding 0.25s;
  overflow: hidden;
`;

const HeroVisual = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 260px;
    height: 260px;
  }
`;

const FloatingCard = styled.div`
  position: absolute;
  background: rgba(124, 92, 255, 0.18);
  border: 2.5px solid #a084ff55;
  border-radius: 18px;
  padding: 22px 28px;
  backdrop-filter: blur(12px);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay || "0s"};
  box-shadow: 0 6px 32px 0 rgba(124,92,255,0.13);
  @media (max-width: 900px) {
    padding: 12px 14px;
  }

  &:nth-child(2) {
    top: 0;
    left: 0;
  }
  &:nth-child(3) {
    top: 50px;
    right: 0;
  }
  &:nth-child(4) {
    bottom: 0;
    left: 50px;
  }
`;

const CardIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const CardCount = styled.p`
  font-size: 0.9rem;
  color: #7c5cff;
  font-weight: 500;
`;

const FeaturesSection = styled.section`
  padding: 80px 100px;
  background: rgba(255, 255, 255, 0.02);

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 60px;
  background: linear-gradient(45deg, #7c5cff, #a084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeaturesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  justify-content: center;
  align-items: stretch;
  max-width: 1200px;
  margin: 0 auto 40px auto;
  flex-wrap: wrap;
  @media (max-width: 1100px) {
    gap: 20px;
  }
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.07);
  border: 1.5px solid #a084ff33;
  border-radius: 18px;
  padding: 32px 28px 28px 28px;
  min-width: 200px;
  max-width: 250px;
  flex: 1 1 220px;
  text-align: center;
  transition: all 0.3s cubic-bezier(.4,1.3,.6,1);
  animation: ${fadeInUp} 0.7s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 6px 24px 0 rgba(124,92,255,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  position: relative;
  z-index: 1;
  &:hover {
    transform: scale(1.045) translateY(-8px);
    background: rgba(124, 92, 255, 0.13);
    box-shadow: 0 16px 48px 0 rgba(124,92,255,0.18), 0 2px 12px 0 rgba(0,0,0,0.13);
    border-color: #a084ff;
    z-index: 10;
  }
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 100%;
    width: 100%;
    padding: 22px 12px 18px 12px;
  }
`;

const FeatureIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.22rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #7c5cff;
`;

const FeatureDescription = styled.p`
  color: #cccccc;
  line-height: 1.5;
  font-size: 1.01rem;
`;

const BenefitsSection = styled.section`
  padding: 100px 0 100px 0;
  background: linear-gradient(120deg, #2d2d2d 60%, #7c5cff22 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const BenefitsGrid = styled.div`
  display: flex;
  gap: 48px;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: rgba(124, 92, 255, 0.10);
  border-radius: 28px;
  padding: 48px 38px 38px 38px;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(124,92,255,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  border: 2.5px solid #a084ff33;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 300px;
  max-width: 340px;
  flex: 1 1 320px;
  transition: all 0.3s cubic-bezier(.4,1.3,.6,1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:hover {
    transform: scale(1.045) translateY(-8px);
    background: rgba(124, 92, 255, 0.18);
    box-shadow: 0 16px 48px 0 rgba(124,92,255,0.22), 0 2px 12px 0 rgba(0,0,0,0.13);
    border-color: #a084ff;
    z-index: 10;
  }
`;

const BenefitIcon = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 28px;
  filter: drop-shadow(0 4px 16px #a084ff44);
  filter: drop-shadow(0 4px 16px #a084ff44);
  /* For SVGs: force black fill */
  filter: drop-shadow(0 4px 16px #a084ff44);
  /* Try to force black color for SVGs */
  & {
    filter: drop-shadow(0 4px 16px #a084ff44);
    /* For SVGs with currentColor or fill, try to force black */
    -webkit-mask-image: none;
    mask-image: none;
    background: none;
    color: #111;
  }
  &.svg-black {
    filter: drop-shadow(0 4px 16px #a084ff44);
    color: #111;
  }
  /* If SVG supports, force fill to black */
  &[src$='.svg'] {
    filter: drop-shadow(0 4px 16px #a084ff44);
    color: #111;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #7c5cff;
  letter-spacing: 0.5px;
`;

const BenefitDescription = styled.p`
  color: #e6e6e6;
  line-height: 1.7;
  font-size: 1.08rem;
  margin-top: 8px;
`;

const CTASection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
  background: none;
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const CTAContent = styled.div`
  max-width: 900px;
  min-width: 320px;
  width: 90vw;
  margin: 0 auto;
  background: linear-gradient(120deg, rgba(124,92,255,0.13) 0%, rgba(160,132,255,0.10) 100%);
  border-radius: 38px;
  box-shadow: 0 8px 32px 0 rgba(124,92,255,0.13), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  padding: 38px 64px 38px 64px;
  text-align: center;
  border: 2.5px solid #a084ff33;
  backdrop-filter: blur(12px);
  @media (max-width: 900px) {
    padding: 28px 10vw 24px 10vw;
    max-width: 98vw;
  }
  @media (max-width: 600px) {
    padding: 18px 6vw 16px 6vw;
    border-radius: 18px;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CTASubtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 40px;
  background: linear-gradient(45deg, #7c5cff, #a084ff);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(124, 92, 255, 0.3);
  margin: 0 auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(124, 92, 255, 0.4);
  }
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.3);
  padding: 60px 100px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px 20px;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #7c5cff;
`;

const FooterDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled.a`
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #7c5cff;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  color: #999999;
  font-size: 0.9rem;
`;

// styled-components para a sessão de comentários
const CommentsSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  padding: 0;
`;
const CommentsTitle = styled.h2`
  text-align: center;
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 48px;
  background: linear-gradient(45deg, #7c5cff, #a084ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const CommentsDoubleCarousel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 100vw;
  align-items: center;
`;
const CommentsCarouselRow = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: ${({ $variant }) => $variant === 2 ? 2 : 1};
  margin-top: ${({ $variant }) => $variant === 1 ? '40px' : '0'};
  margin-bottom: ${({ $variant }) => $variant === 2 ? '40px' : '0'};
`;
const CommentsCarouselScroller = styled.div`
  display: flex;
  gap: 48px;
  width: max-content;
  animation: ${({ $reverse }) => $reverse ? 'scrollCarouselReverse' : 'scrollCarousel'} 80s linear infinite;
  will-change: transform;
  &:hover, &:focus {
    animation-play-state: paused;
  }
  @keyframes scrollCarousel {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes scrollCarouselReverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
`;
const CommentCarouselCard = styled.div`
  background: rgba(30, 24, 54, 0.88);
  border-radius: 22px;
  padding: 38px 32px 28px 32px;
  min-width: 400px;
  max-width: 440px;
  box-shadow: 0 6px 32px 0 rgba(124,92,255,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid rgba(124,92,255,0.16);
  overflow: hidden;
  transition: transform 0.18s, box-shadow 0.18s;
  position: relative;
  z-index: 3;
  &:hover {
    transform: scale(1.045) translateY(-6px);
    box-shadow: 0 12px 36px 0 rgba(124,92,255,0.28), 0 2px 12px 0 rgba(0,0,0,0.13);
    border-color: #a084ff;
    z-index: 10;
  }
  @media (max-width: 900px) {
    min-width: 260px;
    max-width: 320px;
    padding: 18px 10px 14px 10px;
  }
`;
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;
const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #a084ff;
`;
const CommentName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #fff;
`;
const CommentStars = styled.div`
  display: flex;
  gap: 2px;
`;
const Star = styled.span`
  color: ${({ $active }) => ($active ? '#FFD700' : '#888')};
  font-size: 1.1rem;
`;
const CommentText = styled.p`
  color: #e6e6e6;
  font-size: 1.05rem;
  margin-top: 8px;
  font-style: italic;
`;

const FooterIcon = styled.svg`
  width: 18px;
  height: 18px;
  margin-right: 7px;
  margin-bottom: -3px;
  vertical-align: middle;
`;

export default Landing;