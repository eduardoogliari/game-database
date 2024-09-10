--DROP TABLE IF EXISTS jogo_generos;
--DROP TABLE IF EXISTS jogo_plataformas;
--DROP TABLE IF EXISTS jogo_publicadoras;
--DROP TABLE IF EXISTS jogo_imagens;
--DROP TABLE IF EXISTS jogo;
--DROP TABLE IF EXISTS genero;
--DROP TABLE IF EXISTS empresa;
--DROP TABLE IF EXISTS plataforma;

DROP DATABASE IF EXISTS game_db;
CREATE DATABASE game_db;

\c game_db

--DROP USER IF EXISTS anonimo;
--CREATE USER anonimo WITH PASSWORD 'anonimo';
--GRANT SELECT ON ALL TABLES IN SCHEMA public TO anonimo;


------------------------------------------------------------------------
-------------------------- CRIAÇÃO DE TABELAS --------------------------
------------------------------------------------------------------------

CREATE TABLE plataforma (
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome VARCHAR(128) NOT NULL,
  nome_popular VARCHAR(128),
  abreviacao VARCHAR(16),
  foto_url TEXT,
  descricao TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE genero (
  nome VARCHAR(64) NOT NULL,
  abreviacao VARCHAR(32),
  PRIMARY KEY(nome)
);

CREATE TABLE empresa (
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome VARCHAR(255) NOT NULL,
  logo_url TEXT,
  descricao TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE jogo (
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome VARCHAR(512) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE jogo_publicadoras (
  publicadora_id INT,
  jogo_id INT,
  CONSTRAINT fk_publicadora_id
        FOREIGN KEY(publicadora_id)
          REFERENCES empresa(id),
  CONSTRAINT fk_jogo_id
        FOREIGN KEY(jogo_id)
          REFERENCES jogo(id),
  PRIMARY KEY(publicadora_id, jogo_id)
);

CREATE TABLE jogo_desenvolvedoras (
  desenvolvedora_id INT,
  jogo_id INT,
  CONSTRAINT fk_empresa_dev
        FOREIGN KEY(desenvolvedora_id)
          REFERENCES empresa(id),
  CONSTRAINT fk_jogo_id
        FOREIGN KEY(jogo_id)
          REFERENCES jogo(id),
  PRIMARY KEY(desenvolvedora_id, jogo_id)
);

CREATE TABLE jogo_generos (
  jogo_id INT,
  genero_nome VARCHAR(64),
  CONSTRAINT fk_jogo_id
        FOREIGN KEY (jogo_id)
                REFERENCES jogo(id),
  CONSTRAINT fk_genero_nome
        FOREIGN KEY (genero_nome)
                REFERENCES genero(nome),
  PRIMARY KEY(jogo_id, genero_nome)
);

CREATE TABLE jogo_plataformas (
  jogo_id INT,
  plataforma_id INT,
  CONSTRAINT fk_jogo_id
        FOREIGN KEY (jogo_id)
                REFERENCES jogo(id),
  CONSTRAINT fk_plataforma_id
        FOREIGN KEY (plataforma_id)
                REFERENCES plataforma(id),
  PRIMARY KEY(jogo_id, plataforma_id)
);

CREATE TABLE jogo_imagens (
  jogo_id INT,
  imagem_url TEXT,
  CONSTRAINT fk_jogo_id
        FOREIGN KEY (jogo_id)
                REFERENCES jogo(id),
  PRIMARY KEY(jogo_id, imagem_url)
);


----------------------------------------------------------------------
------------------------ POPULAÇÃO DE TABELAS ------------------------
----------------------------------------------------------------------

-- plataforma, genero, empresa, jogo
-- do jogo: publicadoras, imagens, plataformas, generos

INSERT INTO plataforma
(   nome,                                   nome_popular,     abreviacao, foto_url,                               descricao ) VALUES
  ( 'Arcade',                               '',               'ARC',      'img/plataformas/arcade',               ''       ),
  ( 'Nintendo Entertainment System',        'NES',            'NES',      'img/plataformas/nes',                  ''       ),
  ( 'Super Nintendo Entertainment System',  'SNES',           'SNES',     'img/plataformas/snes',                 ''       ),
  ( 'Nintendo 64',                          '',               'N64',      'img/plataformas/n64',                  ''       ),
  ( 'GameCube',                             '',               'GCN',      'img/plataformas/gamecube',             ''       ),
  ( 'Game Boy',                             '',               'GB',       'img/plataformas/gameboy',              ''       ),
  ( 'Game Boy Color',                       '',               'GBC',      'img/plataformas/gameboycolor',         ''       ),
  ( 'Game Boy Advanced',                    '',               'GBA',      'img/plataformas/gameboyadvanced',      ''       ),
  ( 'Nintendo Dual Screen',                 'Nintendo DS',    'NDS',      'img/plataformas/nds',                  ''       ),
  ( 'Nintendo Wii',                         '',               'Wii',      'img/plataformas/wii',                  ''       ),
  ( 'Nintendo Wii U',                       'Wii U',          'WiiU',     'img/plataformas/wiiu',                 ''       ),
  ( 'Nintendo Switch',                      'Switch',         'NSW',      'img/plataformas/switch',               ''       ),
  ( 'PlayStation',                          'PlayStation',    'PS1',      'img/plataformas/playstation1',         ''       ),
  ( 'PlayStation Portable',                 'PSP',            'PSP',      'img/plataformas/psp',                  ''       ),
  ( 'PlayStation 2',                        'PlayStation 2',  'PS2',      'img/plataformas/playstation2',         ''       ),
  ( 'PlayStation 3',                        'PlayStation 3',  'PS3',      'img/plataformas/playstation3',         ''       ),
  ( 'PlayStation 4',                        'PlayStation 4',  'PS4',      'img/plataformas/playstation4',         ''       ),
  ( 'PlayStation 5',                        'PlayStation 5',  'PS5',      'img/plataformas/playstation5',         ''       ),
  ( 'Sega Master System',                   'Master System',  'SMS',      'img/plataformas/mastersystem',         ''       ),
  ( 'Sega Mega Drive',                      'Mega Drive',     'SMD',      'img/plataformas/megadrive',            ''       ),
  ( 'Sega Saturn',                          'Saturn',         'SS',       'img/plataformas/saturn',               ''       ),
  ( 'Sega DreamCast',                       'DreamCast',      'DC',       'img/plataformas/dreamcast',            ''       ),
  ( 'Xbox',                                 '',               'XB',       'img/plataformas/xbox',                 ''       ),
  ( 'Xbox 360',                             '',               '360',      'img/plataformas/xbox360',              ''       ),
  ( 'Xbox One',                             '',               'XBO',      'img/plataformas/xboxone',              ''       ),
  ( 'Xbox Series X',                        '',               'XSX',      'img/plataformas/xboxsx',               ''       ),
  ( 'Xbox Series S',                        '',               'XSS',      'img/plataformas/xboxss',               ''       )
;


INSERT INTO genero(nome, abreviacao) VALUES
  ('Role Playing Game', 'RPG'),
  ('Aventura', ''),
  ('Ação', ''),
  ('Puzzle', ''),
  ('Simulação', ''),
  ('Estratégia', ''),
  ('First Person Shooter', 'FPS'),
  ('Third Person Shooter', 'TPS'),
  ('Arcade', ''),
  ('Shoot ''em up', 'SHMUP'),
  ('Massively Multiplayer Online Game', 'MMO'),
  ('Esporte', ''),
  ('Corrida', ''),
  ('Luta', ''),
  ('Plataforma', ''),
  ('Cartas', ''),
  ('Beat ''em up', ''),
  ('Casual', ''),
  ('Social', ''),
  ('Multiplayer', ''),
  ('Rítmo', '')
;


INSERT INTO empresa
( nome,                                   logo_url,                                 descricao) VALUES
  ('Nintendo',                            '/img/empresas/nintendo',                 ''            ),
  ('Microsoft Game Studios',              '/img/empresas/microsoft_game_studios',   ''            ),
  ('Sony Computer Entertainment',         '/img/empresas/sce',                      ''            ),
  ('SquareSoft',                          '/img/empresas/squaresoft',               ''            ),
  ('Enix',                                '/img/empresas/enix',                     ''            ),
  ('Square-Enix',                         '/img/empresas/square_enix',              ''            ),
  ('SEGA',                                '/img/empresas/sega',                     ''            ),
  ('From Software',                       '/img/empresas/from_software',            ''            ),
  ('Japan Studio',                        '/img/empresas/japan_studio',             ''            ),
  ('Konami',                              '/img/empresas/konami',                   ''            ),
  ('Capcom',                              '/img/empresas/capcom',                   ''            ),
  ('Activision',                          '/img/empresas/activision',               ''            ),
  ('Blizzard Entertainment',              '/img/empresas/blizzard',                 ''            ),
  ('Platinum Games',                      '/img/empresas/platinum_games',           ''            ),
  ('Rockstar Games',                      '/img/empresas/rockstar_games',           ''            ),
  ('Electronic Arts',                     '/img/empresas/ea',                       ''            ),
  ('Bethesda',                            '/img/empresas/bethesda',                 ''            ),
  ('Ubisoft',                             '/img/empresas/ubisoft',                  ''            ),
  ('Bungie',                              '/img/empresas/bungie',                   ''            ),
  ('GameFreak',                           '/img/empresas/gamefreak',                ''            )
;

INSERT INTO jogo(nome) VALUES
  ('Mario Bros.'),
  ('Super Mario Bros.'),
  ('The Legend of Zelda'),
  ('The Legend of Zelda: A Link to the Past'),
  ('The Legend of Zelda: Ocarina of Time'       ),
  ('The Legend of Zelda: Phantom Hourglass'     ),
  ('The Legend of Zelda: Link''s Awakening'     ),
  ('The Legend of Zelda: Oracle of Seasons'),
  ('The Legend of Zelda: The Minish Cap'),
  ('The Legend of Zelda: The Wind Waker'),
  ('The Legend of Zelda: Skyward Sword'),
  ('The Legend of Zelda: Breath of the Wild')
;

INSERT INTO jogo_publicadoras(publicadora_id, jogo_id) VALUES
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='Mario Bros.') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='Super Mario Bros.') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild') )
;

INSERT INTO jogo_desenvolvedoras(desenvolvedora_id, jogo_id) VALUES
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='Mario Bros.') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='Super Mario Bros.') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild') )
;

INSERT INTO jogo_generos(jogo_id, genero_nome) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'), 'Arcade'),
((SELECT id FROM jogo WHERE nome='Mario Bros.'), 'Plataforma'),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'), 'Plataforma'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), 'Ação'),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), 'Aventura')
;

INSERT INTO jogo_plataformas( jogo_id, plataforma_id ) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'), (SELECT id FROM plataforma WHERE nome='Arcade')),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'), (SELECT id FROM plataforma WHERE nome='Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'), (SELECT id FROM plataforma WHERE nome='Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'), (SELECT id FROM plataforma WHERE nome='Nintendo 64')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'), (SELECT id FROM plataforma WHERE nome='Nintendo Dual Screen')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'), (SELECT id FROM plataforma WHERE nome='Game Boy')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'), (SELECT id FROM plataforma WHERE nome='Game Boy Color')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'), (SELECT id FROM plataforma WHERE nome='Game Boy Advanced')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'), (SELECT id FROM plataforma WHERE nome='GameCube')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'), (SELECT id FROM plataforma WHERE nome='Nintendo Wii')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), (SELECT id FROM plataforma WHERE nome='Nintendo Wii U')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), (SELECT id FROM plataforma WHERE nome='Nintendo Switch'))
;

--INSERT INTO jogo_imagens( jogo_id, imagem_url ) VALUES;
