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
  ( 'Game Boy',                             'Game Boy',           'GB',         'img/plataformas/game_boy/logo.jpg',              ''       ),
  ( 'Game Boy Color',                       'Game Boy Color',     'GBC',        'img/plataformas/game_boy_color/logo.jpg',         ''       ),
  ( 'Game Boy Advance',                    'Game Boy Advance',  'GBA',        'img/plataformas/game_boy_advance/logo.jpg',      ''       ),
  ( 'Nintendo DS',                 'Nintendo DS',        'NDS',        'img/plataformas/nds/logo.jpg',                  ''       ),
  ( 'Nintendo Wii',                         'Wii',                'Wii',        'img/plataformas/wii/logo.jpg',                  ''       ),
  ( 'Nintendo Wii U',                       'Wii U',              'WiiU',       'img/plataformas/wii_u/logo.jpg',                 ''       ),
  ( 'Nintendo Switch',                      'Switch',             'NSW',        'img/plataformas/switch/logo.jpg',               ''       ),
  ( 'PlayStation',                          'PlayStation',        'PS1',        'img/plataformas/ps1/logo.jpg',         ''       ),
  ( 'PlayStation Portable',                 'PSP',                'PSP',        'img/plataformas/psp/logo.jpg',                  ''       ),
  ( 'PlayStation Vita',                 'PSV',                'PSV',        'img/plataformas/ps_vita/logo.jpg',                  ''       ),
  ( 'PlayStation 2',                        'PlayStation 2',      'PS2',        'img/plataformas/ps2/logo.jpg',         ''       ),
  ( 'PlayStation 3',                        'PlayStation 3',      'PS3',        'img/plataformas/ps3/logo.jpg',         ''       ),
  ( 'PlayStation 4',                        'PlayStation 4',      'PS4',        'img/plataformas/ps4/logo.jpg',         ''       ),
  ( 'PlayStation 5',                        'PlayStation 5',      'PS5',        'img/plataformas/ps5/logo.jpg',         ''       ),
  ( 'Sega Master System',                   'Master System',      'SMS',        'img/plataformas/sms/logo.jpg',         ''       ),
  ( 'Sega Mega Drive',                      'Mega Drive',         'SMD',        'img/plataformas/mega_drive/logo.jpg',            ''       ),
  ( 'Sega Saturn',                          'Saturn',             'SS',         'img/plataformas/saturn/logo.jpg',               ''       ),
  ( 'Sega DreamCast',                       'DreamCast',          'DC',         'img/plataformas/dreamcast/logo.jpg',            ''       ),
  ( 'Xbox',                                 'Xbox',               'XB',         'img/plataformas/xbox/logo.jpg',                 ''       ),
  ( 'Xbox 360',                             'Xbox 360',           '360',        'img/plataformas/xbox_360/logo.jpg',              ''       ),
  ( 'Xbox One',                             'Xbox One',           'XBO',        'img/plataformas/xbox_one/logo.jpg',              ''       ),
  ( 'Xbox Series X|S',                       'Xbox Series X|S',      'XXS',        'img/plataformas/xbox_xs/logo.jpg',               ''       )
  -- ( 'Xbox Series S',                        'Xbox Series S',      'XSS',        'img/plataformas/xboxss/logo.jpg',               ''       )
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
  ('Nintendo',                            'img/empresas/nintendo/logo.jpg',                 '<p>É a empresa mais antiga da indústria de jogos, e uma das mais influentes da história. Fundada no Japão por Fusajiro Yamauchi em 22 de Novembro de 1859, a Nintendo iniciou sua trajetória através da produção e comércio de cartas Hanafuda. Foi a partir da década de 1980 que a Nintendo alcançou reconhecimento global através do NES, o primeiro videogame da empresa.</p><p> Desde então, a Nintendo têm encantado jogadores do mundo todo através de franquias como Mario, Zelda, Pokémon, além de várias outras franquias de enorme sucesso.</p>'),
  ('Microsoft Game Studios',              'img/empresas/microsoft_game_studios/logo.jpg',   ''            ),
  ('Microsoft Corporation',               'img/empresas/microsoft_corporation/logo.jpg',   ''            ),
  ('Bandai Namco',               'img/empresas/bandai_namco/logo.jpg',   ''            ),
  ('Atlus',               'img/empresas/atlus/logo.jpg',   ''            ),
  -- ('Sony Computer Entertainment',         'img/empresas/sce/logo.jpg',                      ''            ),
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
('The Legend of Zelda: The Minish Cap'       , 'img/plataformas/game_boy_advance/jogos/zelda_minish_cap/capa.jpg',     '2004-11-04',         '' ),
('The Legend of Zelda: The Wind Waker'       , 'img/plataformas/gamecube/jogos/zelda_wind_waker/capa.jpg',              '2002-12-13',         '' ),
('The Legend of Zelda: Skyward Sword'        , 'img/plataformas/wii/jogos/zelda_skyward_sword/capa.jpg',                '2011-11-18',         '' ),
('The Legend of Zelda: Breath of the Wild'   , 'img/plataformas/switch/jogos/zelda_botw/capa.jpg',                      '2017-03-03',         '' ),

('Final Fantasy VII'                        , 'img/plataformas/ps1/jogos/ffvii/capa.jpg',                               '1997-01-31',         '' ),
('Demon''s Souls'                           , 'img/plataformas/ps3/jogos/demons_souls/capa.jpg',                        '2009-10-05',         '' ),
('Ultimate Ghosts''n Goblins'               , 'img/plataformas/psp/jogos/ultimate_ghosts_and_goblins/capa.jpg',         '2006-08-13',         '' ),
('Shenmue'                                  , 'img/plataformas/dreamcast/jogos/shenmue/capa.jpg',                       '1999/12/29',         '' ),
('Phantasy Star'                            , 'img/plataformas/sms/jogos/phantasy_star/capa.jpg',                       '1987/12/20',         '' ),
('Sonic the Hedgehog'                       , 'img/plataformas/mega_drive/jogos/sonic1/capa.jpg',                       '1991/06/23',         '' ),
('Nights into Dreams'                       , 'img/plataformas/saturn/jogos/nights_into_dreams/capa.jpg',               '1996/07/05',         '' ),
('Halo: Combat Evolved'                     , 'img/plataformas/xbox/jogos/halo/capa.jpg',                               '2001/11/15',         '' ),
('Halo 3'                                   , 'img/plataformas/xbox_360/jogos/halo3/capa.jpg',                          '2007/09/25',         '' ),
('Dead Rising 3'                            , 'img/plataformas/xbox_one/jogos/dead_rising3/capa.jpg',                   '2013/11/23',         '' ),
('Dragon''s Dogma 2'                        , 'img/plataformas/xbox_xs/jogos/dragons_dogma2/capa.jpg',                       '2024/03/21',         '' )
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
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild') ),

  ( (SELECT id FROM empresa WHERE nome='SquareSoft'),               (SELECT id FROM jogo WHERE nome='Final Fantasy VII') ),
  ( (SELECT id FROM empresa WHERE nome='Atlus'),                    (SELECT id FROM jogo WHERE nome='Demon''s Souls') ),
  ( (SELECT id FROM empresa WHERE nome='Bandai Namco'),             (SELECT id FROM jogo WHERE nome='Demon''s Souls') ),
  ( (SELECT id FROM empresa WHERE nome='Capcom'),                   (SELECT id FROM jogo WHERE nome='Ultimate Ghosts''n Goblins') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'),                     (SELECT id FROM jogo WHERE nome='Shenmue') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'),                     (SELECT id FROM jogo WHERE nome='Phantasy Star') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'),                     (SELECT id FROM jogo WHERE nome='Sonic the Hedgehog') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'),                     (SELECT id FROM jogo WHERE nome='Nights into Dreams') ),
  ( (SELECT id FROM empresa WHERE nome='Microsoft Corporation'),    (SELECT id FROM jogo WHERE nome='Halo: Combat Evolved') ),
  ( (SELECT id FROM empresa WHERE nome='Microsoft Corporation'),    (SELECT id FROM jogo WHERE nome='Halo 3') ),
  ( (SELECT id FROM empresa WHERE nome='Capcom'),                   (SELECT id FROM jogo WHERE nome='Dead Rising 3') ),
  ( (SELECT id FROM empresa WHERE nome='Capcom'),                   (SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2') )

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
  ( (SELECT id FROM empresa WHERE nome='Nintendo'), (SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild') ),
  ( (SELECT id FROM empresa WHERE nome='SquareSoft'), (SELECT id FROM jogo WHERE nome='Final Fantasy VII') ),
  ( (SELECT id FROM empresa WHERE nome='From Software'), (SELECT id FROM jogo WHERE nome='Demon''s Souls') ),
  ( (SELECT id FROM empresa WHERE nome='Capcom'), (SELECT id FROM jogo WHERE nome='Ultimate Ghosts''n Goblins') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'), (SELECT id FROM jogo WHERE nome='Shenmue') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'), (SELECT id FROM jogo WHERE nome='Phantasy Star') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'), (SELECT id FROM jogo WHERE nome='Sonic the Hedgehog') ),
  ( (SELECT id FROM empresa WHERE nome='SEGA'), (SELECT id FROM jogo WHERE nome='Nights into Dreams') ),
  ( (SELECT id FROM empresa WHERE nome='Bungie'), (SELECT id FROM jogo WHERE nome='Halo: Combat Evolved') ),
  ( (SELECT id FROM empresa WHERE nome='Bungie'), (SELECT id FROM jogo WHERE nome='Halo 3') ),
  ( (SELECT id FROM empresa WHERE nome='Capcom'), (SELECT id FROM jogo WHERE nome='Dead Rising 3') ),
  ( (SELECT id FROM empresa WHERE nome='Capcom'), (SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2') )
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
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),      (SELECT id FROM genero WHERE nome='Aventura')),
((SELECT id FROM jogo WHERE nome='Final Fantasy VII'),                             (SELECT id FROM genero WHERE nome='Role Playing Game')),
((SELECT id FROM jogo WHERE nome='Demon''s Souls'),                                (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='Demon''s Souls'),                                (SELECT id FROM genero WHERE nome='Role Playing Game')),
((SELECT id FROM jogo WHERE nome='Ultimate Ghosts''n Goblins'),                    (SELECT id FROM genero WHERE nome='Arcade')),
((SELECT id FROM jogo WHERE nome='Shenmue'),                                       (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='Shenmue'),                                       (SELECT id FROM genero WHERE nome='Aventura')),
((SELECT id FROM jogo WHERE nome='Phantasy Star'),                                 (SELECT id FROM genero WHERE nome='Role Playing Game')),
((SELECT id FROM jogo WHERE nome='Sonic the Hedgehog'),                            (SELECT id FROM genero WHERE nome='Plataforma')),
((SELECT id FROM jogo WHERE nome='Nights into Dreams'),                            (SELECT id FROM genero WHERE nome='Plataforma')),
((SELECT id FROM jogo WHERE nome='Halo: Combat Evolved'),                                          (SELECT id FROM genero WHERE nome='First Person Shooter')),
((SELECT id FROM jogo WHERE nome='Halo 3'),                                        (SELECT id FROM genero WHERE nome='First Person Shooter')),
((SELECT id FROM jogo WHERE nome='Dead Rising 3'),                                 (SELECT id FROM genero WHERE nome='Ação')),
((SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2'),                             (SELECT id FROM genero WHERE nome='Role Playing Game')),
((SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2'),                             (SELECT id FROM genero WHERE nome='Ação'))
;

INSERT INTO jogo_plataformas( jogo_id, plataforma_id ) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                                (SELECT id FROM plataforma WHERE nome='Arcade')),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'),                          (SELECT id FROM plataforma WHERE nome='Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                        (SELECT id FROM plataforma WHERE nome='Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'),       (SELECT id FROM plataforma WHERE nome='Nintendo 64')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past'),    (SELECT id FROM plataforma WHERE nome='Super Nintendo Entertainment System')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'),     (SELECT id FROM plataforma WHERE nome='Nintendo DS')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'),     (SELECT id FROM plataforma WHERE nome='Game Boy')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'),     (SELECT id FROM plataforma WHERE nome='Game Boy Color')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'),        (SELECT id FROM plataforma WHERE nome='Game Boy Advance')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'),        (SELECT id FROM plataforma WHERE nome='GameCube')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'),         (SELECT id FROM plataforma WHERE nome='Nintendo Wii')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),    (SELECT id FROM plataforma WHERE nome='Nintendo Wii U')),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'),    (SELECT id FROM plataforma WHERE nome='Nintendo Switch')),

((SELECT id FROM jogo WHERE nome='Final Fantasy VII')                       ,    (SELECT id FROM plataforma WHERE nome='PlayStation')),
((SELECT id FROM jogo WHERE nome='Demon''s Souls')                          ,    (SELECT id FROM plataforma WHERE nome='PlayStation 3')),
((SELECT id FROM jogo WHERE nome='Ultimate Ghosts''n Goblins')              ,    (SELECT id FROM plataforma WHERE nome='PlayStation Portable')),
((SELECT id FROM jogo WHERE nome='Shenmue')                                 ,    (SELECT id FROM plataforma WHERE nome='Sega DreamCast')),
((SELECT id FROM jogo WHERE nome='Phantasy Star')                           ,    (SELECT id FROM plataforma WHERE nome='Sega Master System')),
((SELECT id FROM jogo WHERE nome='Sonic the Hedgehog')                      ,    (SELECT id FROM plataforma WHERE nome='Sega Mega Drive')),
((SELECT id FROM jogo WHERE nome='Nights into Dreams')                      ,    (SELECT id FROM plataforma WHERE nome='Sega Saturn')),
((SELECT id FROM jogo WHERE nome='Halo: Combat Evolved')                                    ,    (SELECT id FROM plataforma WHERE nome='Xbox')),
((SELECT id FROM jogo WHERE nome='Halo 3')                                  ,    (SELECT id FROM plataforma WHERE nome='Xbox 360')),
((SELECT id FROM jogo WHERE nome='Dead Rising 3')                           ,    (SELECT id FROM plataforma WHERE nome='Xbox One')),
((SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2')                       ,    (SELECT id FROM plataforma WHERE nome='Xbox Series X|S'))
;


INSERT INTO jogo_imagens(
jogo_id,                                                                     imagem_url,                                                                  legenda ) VALUES
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                             'img/plataformas/arcade/jogos/mario_bros/000.jpg' ,                          ''    ),
((SELECT id FROM jogo WHERE nome='Mario Bros.'),                             'img/plataformas/arcade/jogos/mario_bros/001.jpg' ,                          ''    ),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'),                       'img/plataformas/nes/jogos/super_mario_bros/000.jpg' ,                       ''    ),
((SELECT id FROM jogo WHERE nome='Super Mario Bros.'),                       'img/plataformas/nes/jogos/super_mario_bros/001.jpg' ,                       ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                     'img/plataformas/nes/jogos/zelda1/000.jpg' ,                                 'aa'    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda'),                     'img/plataformas/nes/jogos/zelda1/001.jpg' ,                                 ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'),    'img/plataformas/n64/jogos/zelda_ocarina_of_time/000.jpg' ,                  ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Ocarina of Time'),    'img/plataformas/n64/jogos/zelda_ocarina_of_time/001.jpg' ,                  ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past'), 'img/plataformas/snes/jogos/zelda_link_to_the_past/000.jpg' ,                ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: A Link to the Past'), 'img/plataformas/snes/jogos/zelda_link_to_the_past/001.jpg' ,                ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'),  'img/plataformas/nds/jogos/zelda_phantom_hourglass/000.jpg' ,                ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Phantom Hourglass'),  'img/plataformas/nds/jogos/zelda_phantom_hourglass/001.jpg' ,                ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'),  'img/plataformas/game_boy/jogos/zelda_links_awakening/000.jpg' ,             ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Link''s Awakening'),  'img/plataformas/game_boy/jogos/zelda_links_awakening/001.jpg' ,             ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'),  'img/plataformas/game_boy_color/jogos/zelda_oracle_of_seasons/000.jpg' ,     ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Oracle of Seasons'),  'img/plataformas/game_boy_color/jogos/zelda_oracle_of_seasons/001.jpg' ,     ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'),     'img/plataformas/game_boy_advance/jogos/zelda_minish_cap/000.jpg' ,         ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Minish Cap'),     'img/plataformas/game_boy_advance/jogos/zelda_minish_cap/001.jpg' ,         ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'),     'img/plataformas/gamecube/jogos/zelda_wind_waker/000.jpg' ,                  ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: The Wind Waker'),     'img/plataformas/gamecube/jogos/zelda_wind_waker/001.jpg' ,                  ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'),      'img/plataformas/wii/jogos/zelda_skyward_sword/000.jpg' ,                    ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Skyward Sword'),      'img/plataformas/wii/jogos/zelda_skyward_sword/001.jpg' ,                    ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), 'img/plataformas/switch/jogos/zelda_botw/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='The Legend of Zelda: Breath of the Wild'), 'img/plataformas/switch/jogos/zelda_botw/001.jpg',                           ''    ),

((SELECT id FROM jogo WHERE nome='Final Fantasy VII'),          'img/plataformas/ps1/jogos/ffvii/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Final Fantasy VII'),          'img/plataformas/ps1/jogos/ffvii/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Demon''s Souls'),             'img/plataformas/ps3/jogos/demons_souls/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Demon''s Souls'),             'img/plataformas/ps3/jogos/demons_souls/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Ultimate Ghosts''n Goblins'), 'img/plataformas/psp/jogos/ultimate_ghosts_and_goblins/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Ultimate Ghosts''n Goblins'), 'img/plataformas/psp/jogos/ultimate_ghosts_and_goblins/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Shenmue'),                    'img/plataformas/dreamcast/jogos/shenmue/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Shenmue'),                    'img/plataformas/dreamcast/jogos/shenmue/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Phantasy Star'),              'img/plataformas/sms/jogos/phantasy_star/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Phantasy Star'),              'img/plataformas/sms/jogos/phantasy_star/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Sonic the Hedgehog'),         'img/plataformas/mega_drive/jogos/sonic1/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Sonic the Hedgehog'),         'img/plataformas/mega_drive/jogos/sonic1/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Nights into Dreams'),         'img/plataformas/saturn/jogos/nights_into_dreams/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Nights into Dreams'),         'img/plataformas/saturn/jogos/nights_into_dreams/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Halo: Combat Evolved'),       'img/plataformas/xbox/jogos/halo/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Halo: Combat Evolved'),       'img/plataformas/xbox/jogos/halo/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Halo 3'),                     'img/plataformas/xbox_360/jogos/halo3/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Halo 3'),                     'img/plataformas/xbox_360/jogos/halo3/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Dead Rising 3'),              'img/plataformas/xbox_one/jogos/dead_rising3/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Dead Rising 3'),              'img/plataformas/xbox_one/jogos/dead_rising3/001.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2'),          'img/plataformas/xbox_xs/jogos/dragons_dogma2/000.jpg',                           ''    ),
((SELECT id FROM jogo WHERE nome='Dragon''s Dogma 2'),          'img/plataformas/xbox_xs/jogos/dragons_dogma2/001.jpg',                           ''    )
;

