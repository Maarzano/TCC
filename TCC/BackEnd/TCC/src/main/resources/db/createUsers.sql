USE almoxarifado_db;

-- 1. Inserir USUÁRIOS
INSERT INTO usuarios (celular, cpf, data_de_criação, email, imagem_perfil, nome_completo, senha, data_de_atualização)
VALUES
('11999990001', '12345678901', NOW(), 'joao@gmail.com', NULL, 'João Silva', 'senha123', NOW()),
('11999990002', '98765432100', NOW(), 'maria@gmail.com', NULL, 'Maria Souza', 'senha456', NOW()),
('11999990003', '32165498700', NOW(), 'carlos@gmail.com', NULL, 'Carlos Lima', 'senha789', NOW());

-- 2. Inserir ITENS
INSERT INTO items (data_de_criacao, descricao, imagem, nome_item, quantidade)
VALUES
(NOW(), 'Teclado mecânico RGB', 'teclado.png', 'Teclado', 50),
(NOW(), 'Mouse gamer 6400 DPI', 'mouse.png', 'Mouse', 30),
(NOW(), 'Monitor LED 24"', 'monitor.png', 'Monitor', 20),
(NOW(), 'Notebook i5 com SSD', 'notebook.png', 'Notebook', 15);

-- 3. Inserir FUNCIONÁRIOS
INSERT INTO funcionarios (
  ativo_desativo_funcionario, celular_funcionario, cpf_funcionario,
  data_nascimento_funcionario, descricao_funcionario, email_funcionario,
  image_profile, nome_funcionario
) VALUES
(b'1', '0980393221', '49170837783', '2006-06-09 21:39:15', 'mama a rola do Gb',
 'arthuzin@gmail.com', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTRd...', 'arthuzin'),

(b'1', '11988887777', '12312312312', '1990-05-15 00:00:00', 'Gerente de almoxarifado',
 'bruna@empresa.com', NULL, 'Bruna Oliveira'),

(b'1', '11977776666', '32132132132', '1985-03-22 00:00:00', 'Auxiliar de estoque',
 'carlos@empresa.com', NULL, 'Carlos Fernandes');

-- 4. Inserir MOVIMENTAÇÕES
INSERT INTO movimentacoes (
  data_movimentacao, status_movimentacao, tipo_movimentacao, id_funcionario
) VALUES
(NOW(), 'CONCLUIDO', 'ENTRADA', 1),
(NOW(), 'CONCLUIDO', 'SAIDA', 2),
(NOW(), 'PENDENTE', 'ENTRADA', 3),
(NOW(), 'CONCLUIDO', 'SAIDA', 1);

-- 5. Inserir MOVIMENTAÇÃO_ITENS
INSERT INTO movimentacao_itens (quantidade, item_id, movimentacao_id)
VALUES
(10, 1, 1),  -- Teclado, ENTRADA
(5, 2, 1),   -- Mouse, ENTRADA
(3, 3, 2),   -- Monitor, SAIDA
(2, 4, 3),   -- Notebook, ENTRADA
(4, 2, 4);   -- Mouse, SAIDA

-- 6. Inserir HISTÓRICO
INSERT INTO historico (data_registro, descricao, id_movimentacao)
VALUES
(NOW(), 'Entrada de teclados e mouses', 1),
(NOW(), 'Saída de monitores', 2),
(NOW(), 'Entrada de notebooks aguardando conferência', 3),
(NOW(), 'Saída de mouses para TI', 4);
