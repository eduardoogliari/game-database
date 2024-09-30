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
  id INT GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome VARCHAR(64) NOT NULL,
  abreviacao VARCHAR(32),
  PRIMARY KEY(id)
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
  imagem_capa_url TEXT,
  data_lancamento DATE,
  descricao TEXT,
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
  genero_id INT,
  CONSTRAINT fk_jogo_id
        FOREIGN KEY (jogo_id)
                REFERENCES jogo(id),
  CONSTRAINT fk_genero_id
        FOREIGN KEY (genero_id)
                REFERENCES genero(id),
  PRIMARY KEY(jogo_id, genero_id)
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
  legenda TEXT,
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
(   nome,                                   nome_popular,         abreviacao,   foto_url,                                       descricao ) VALUES
  ( 'Arcade',                               'Arcade',             'ARC',        'img/plataformas/arcade/logo.jpg',               ''       ),
  ( 'Nintendo Entertainment System',        'NES',                'NES',        'img/plataformas/nes/logo.jpg',                  ''       ),
  ( 'Super Nintendo Entertainment System',  'SNES',               'SNES',       'img/plataformas/snes/logo.jpg',                 ''       ),
  ( 'Nintendo 64',                          'Nintendo 64',        'N64',        'img/plataformas/n64/logo.jpg',                  ''       ),
  ( 'GameCube',                             'GameCube',           'GCN',        'img/plataformas/gamecube/logo.jpg',             ''       ),
  ( 'Game Boy',                             'Game Boy',           'GB',         'img/plataformas/gameboy/logo.jpg',              ''       ),
  ( 'Game Boy Color',                       'Game Boy Color',     'GBC',        'img/plataformas/gameboycolor/logo.jpg',         ''       ),
  ( 'Game Boy Advanced',                    'Game Boy Advanced',  'GBA',        'img/plataformas/gameboyadvanced/logo.jpg',      ''       ),
  ( 'Nintendo Dual Screen',                 'Nintendo DS',        'NDS',        'img/plataformas/nds/logo.jpg',                  ''       ),
  ( 'Nintendo Wii',                         'Wii',                'Wii',        'img/plataformas/wii/logo.jpg',                  ''       ),
  ( 'Nintendo Wii U',                       'Wii U',              'WiiU',       'img/plataformas/wiiu/logo.jpg',                 ''       ),
  ( 'Nintendo Switch',                      'Switch',             'NSW',        'img/plataformas/switch/logo.jpg',               ''       ),
  ( 'PlayStation',                          'PlayStation',        'PS1',        'img/plataformas/playstation1/logo.jpg',         ''       ),
  ( 'PlayStation Portable',                 'PSP',                'PSP',        'img/plataformas/psp/logo.jpg',                  ''       ),
  ( 'PlayStation 2',                        'PlayStation 2',      'PS2',        'img/plataformas/playstation2/logo.jpg',         ''       ),
  ( 'PlayStation 3',                        'PlayStation 3',      'PS3',        'img/plataformas/playstation3/logo.jpg',         ''       ),
  ( 'PlayStation 4',                        'PlayStation 4',      'PS4',        'img/plataformas/playstation4/logo.jpg',         ''       ),
  ( 'PlayStation 5',                        'PlayStation 5',      'PS5',        'img/plataformas/playstation5/logo.jpg',         ''       ),
  ( 'Sega Master System',                   'Master System',      'SMS',        'img/plataformas/mastersystem/logo.jpg',         ''       ),
  ( 'Sega Mega Drive',                      'Mega Drive',         'SMD',        'img/plataformas/megadrive/logo.jpg',            ''       ),
  ( 'Sega Saturn',                          'Saturn',             'SS',         'img/plataformas/saturn/logo.jpg',               ''       ),
  ( 'Sega DreamCast',                       'DreamCast',          'DC',         'img/plataformas/dreamcast/logo.jpg',            ''       ),
  ( 'Xbox',                                 'Xbox',               'XB',         'img/plataformas/xbox/logo.jpg',                 ''       ),
  ( 'Xbox 360',                             'Xbox 360',           '360',        'img/plataformas/xbox360/logo.jpg',              ''       ),
  ( 'Xbox One',                             'Xbox One',           'XBO',        'img/plataformas/xboxone/logo.jpg',              ''       ),
  ( 'Xbox Series X',                        'Xbox Series X',      'XSX',        'img/plataformas/xboxsx/logo.jpg',               ''       ),
  ( 'Xbox Series S',                        'Xbox Series S',      'XSS',        'img/plataformas/xboxss/logo.jpg',               ''       )
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
( nome,                                   logo_url,                                         descricao) VALUES
  ('Nintendo',                            'img/empresas/nintendo/logo.jpg',                 ''            ),
  ('Microsoft Game Studios',              'img/empresas/microsoft_game_studios/logo.jpg',   ''            ),
  ('Sony Computer Entertainment',         'img/empresas/sce/logo.jpg',                      ''            ),
  ('SquareSoft',                          'img/empresas/squaresoft/logo.jpg',               ''            ),
  ('Enix',                                'img/empresas/enix/logo.jpg',                     ''            ),
  ('Square-Enix',                         'img/empresas/square_enix/logo.jpg',              ''            ),
  ('SEGA',                                'img/empresas/sega/logo.jpg',                     ''            ),
  ('From Software',                       'img/empresas/from_software/logo.jpg',            ''            ),
  ('Japan Studio',                        'img/empresas/japan_studio/logo.jpg',             ''            ),
  ('Konami',                              'img/empresas/konami/logo.jpg',                   ''            ),
  ('Capcom',                              'img/empresas/capcom/logo.jpg',                   ''            ),
  ('Activision',                          'img/empresas/activision/logo.jpg',               ''            ),
  ('Blizzard Entertainment',              'img/empresas/blizzard/logo.jpg',                 ''            ),
  ('Platinum Games',                      'img/empresas/platinum_games/logo.jpg',           ''            ),
  ('Rockstar Games',                      'img/empresas/rockstar_games/logo.jpg',           ''            ),
  ('Electronic Arts',                     'img/empresas/ea/logo.jpg',                       ''            ),
  ('Bethesda',                            'img/empresas/bethesda/logo.jpg',                 ''            ),
  ('Ubisoft',                             'img/empresas/ubisoft/logo.jpg',                  ''            ),
  ('Bungie',                              'img/empresas/bungie/logo.jpg',                   ''            ),
  ('GameFreak',                           'img/empresas/gamefreak/logo.jpg',                ''            )
;

INSERT INTO jogo (
 nome,                                          imagem_capa_url,                                                        data_lancamento,      descricao ) VALUES
('Mario Bros.'                               , 'img/plataformas/arcade/jogos/mario_bros/capa.jpg',                      '1983-07-14',         '' ),
('Super Mario Bros.'                         , 'img/plataformas/nes/jogos/super_mario_bros/capa.jpg',                   '1985-09-13',         '' ),
('The Legend of Zelda'                       , 'img/plataformas/nes/jogos/zelda1/capa.jpg',                             '1986-02-21',         'Primeiro jogo da franquia Zelda' ),
('The Legend of Zelda: A Link to the Past'   , 'img/plataformas/snes/jogos/zelda_link_to_the_past/capa.jpg',            '1991-11-21',         '' ),
('The Legend of Zelda: Ocarina of Time'      , 'img/plataformas/n64/jogos/zelda_ocarina_of_time/capa.jpg',              '1998-11-21',         '' ),
('The Legend of Zelda: Phantom Hourglass'    , 'img/plataformas/nds/jogos/zelda_phantom_hourglass/capa.jpg',            '2007-06-23',         '' ),
('The Legend of Zelda: Link''s Awakening'    , 'img/plataformas/game_boy/jogos/zelda_links_awakening/capa.jpg',         '1993-06-06',         '' ),
('The Legend of Zelda: Oracle of Seasons'    , 'img/plataformas/game_boy_color/jogos/zelda_oracle_of_seasons/capa.jpg', '2001-02-27',         '' ),
('The Legend of Zelda: The Minish Cap'       , 'img/plataformas/game_boy_advanced/jogos/zelda_minish_cap/capa.jpg',     '2004-11-04',         '' ),
('The Legend of Zelda: The Wind Waker'       , 'img/plataformas/gamecube/jogos/zelda_wind_waker/capa.jpg',              '2002-12-13',         '' ),
('The Legend of Zelda: Skyward Sword'        , 'img/plataformas/wii/jogos/zelda_skyward_sword/capa.jpg',                '2011-11-18',         '' ),
('The Legend of Zelda: Breath of the Wild'   , 'img/plataformas/switch/jogos/zelda_botw/capa.jpg',                      '2017-03-03',         '' )
;

INSERT INTO jogo_publicadoras(publicadora_id, jogo_id) VALUES
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='Mario Bros.') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='Super Mario Bros.') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past') ),
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
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword') ),
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild') )
;

INSERT INTO jogo_generos(jogo_id, genero_id) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                                  (SELECT id FROM genero WHERE nome='Arcade')),
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                                  (SELECT id FROM genero WHERE nome='Plataforma')),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'),                            (SELECT id FROM genero WHERE nome='Plataforma')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                          (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'),         (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past'),      (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'),       (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'),       (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'),       (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'),          (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'),          (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'),           (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),      (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),      (SELECT id FROM genero WHERE nome='Aventura'))
;

INSERT INTO jogo_plataformas( jogo_id, plataforma_id ) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                                (SELECT id FROM plataforma WHERE nome='Arcade')),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'),                          (SELECT id FROM plataforma WHERE nome='Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                        (SELECT id FROM plataforma WHERE nome='Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'),       (SELECT id FROM plataforma WHERE nome='Nintendo 64')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past'),    (SELECT id FROM plataforma WHERE nome='Super Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'),     (SELECT id FROM plataforma WHERE nome='Nintendo Dual Screen')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'),     (SELECT id FROM plataforma WHERE nome='Game Boy')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'),     (SELECT id FROM plataforma WHERE nome='Game Boy Color')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'),        (SELECT id FROM plataforma WHERE nome='Game Boy Advanced')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'),        (SELECT id FROM plataforma WHERE nome='GameCube')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'),         (SELECT id FROM plataforma WHERE nome='Nintendo Wii')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),    (SELECT id FROM plataforma WHERE nome='Nintendo Wii U')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),    (SELECT id FROM plataforma WHERE nome='Nintendo Switch'))
;


INSERT INTO jogo_imagens(
jogo_id,                                                                     imagem_url,                                                                  legenda ) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                             'img/plataformas/arcade/jogos/mario_bros/000.jpg' ,                          ''    ),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'),                       'img/plataformas/nes/jogos/super_mario_bros/000.jpg' ,                       ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                     'img/plataformas/nes/jogos/zelda1/000.jpg' ,                                 'aa'    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                     'img/plataformas/nes/jogos/zelda1/001.jpg' ,                                 ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'),    'img/plataformas/n64/jogos/zelda_ocarina_of_time/000.jpg' ,                  ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past'), 'img/plataformas/snes/jogos/zelda_link_to_the_past/000.jpg' ,                ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'),  'img/plataformas/nds/jogos/zelda_phantom_hourglass/000.jpg' ,                ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'),  'img/plataformas/game_boy/jogos/zelda_links_awakening/000.jpg' ,             ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'),  'img/plataformas/game_boy_color/jogos/zelda_oracle_of_seasons/000.jpg' ,     ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'),     'img/plataformas/game_boy_advanced/jogos/zelda_minish_cap/000.jpg' ,         ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'),     'img/plataformas/gamecube/jogos/zelda_wind_waker/000.jpg' ,                  ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'),      'img/plataformas/wii/jogos/zelda_skyward_sword/000.jpg' ,                    ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), 'img/plataformas/switch/jogos/zelda_botw/000.jpg',                           ''    )
;

