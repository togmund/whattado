-- Example movies things
INSERT INTO
  todos (
    name,
    author,
    year,
    api_id,
    genre,
    url,
    img,
    age_rating,
    user_rating,
    type_id
  )
VALUES
  (
    'Hello! Next Time We Will Be Friends',
    'James Ottley',
    '2011-07-18',
    '1462892094',
    'Self-Help',
    'https://play.google.com/store/books/details?id=AgMZWyOQhZkC&source=gbs_api',
    'http://books.google.com/books/content?id=AgMZWyOQhZkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    'NOT_MATURE',
    '5',
    2
  );

INSERT INTO
  todos (
    name,
    author,
    year,
    api_id,
    genre,
    url,
    img,
    age_rating,
    user_rating,
    type_id
  )
VALUES
  (
    'JavaScript: The Definitive Guide',
    'David Flanagan',
    '2006-08-17
',
    '9780596554477',
    'Computers',
    'https://play.google.com/store/books/details?id=2weL0iAfrEMC&source=gbs_api
',
    'http://books.google.com/books/content?id=2weL0iAfrEMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    'NOT_MATURE',
    '4',
    2
  );

INSERT INTO
  todos (
    name,
    author,
    year,
    api_id,
    genre,
    url,
    img,
    age_rating,
    type_id
  )
VALUES
  (
    'The Immortals',
    'Isaac Asimov',
    '1984-01-01',
    '081721741X',
    'Juvenile Fiction',
    'http://books.google.ca/books?id=94RxVOm4HUsC&dq=asimov&hl=&source=gbs_api',
    'http://books.google.com/books/content?id=94RxVOm4HUsC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    'NOT_MATURE',
    2
  );

INSERT INTO
  todos (
    name,
    author,
    year,
    api_id,
    genre,
    url,
    img,
    age_rating,
    type_id
  )
VALUES
  (
    'Grimm''s Fairy Tales - With Many Illustrations in Colour and in Black-And-White by Helen Stratton
',
    'Brothers Grimm',
    '2013-04-16',
    '9781473384170',
    'Fiction',
    'https://play.google.com/store/books/details?id=pfF9CgAAQBAJ&source=gbs_api',
    'http://books.google.com/books/content?id=pfF9CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    'NOT_MATURE', 2);

    INSERT INTO
  todos (
    name,
    author,
    year,
    api_id,
    genre,
    url,
    img,
    age_rating,
    user_rating,
    type_id
  )
VALUES
  (
    'The Lord of the Rings',
    'J. R. R. Tolkien',
    '2012',
    '0544003411',
    'Fiction',
    'http://books.google.ca/books?id=AVVoPwAACAAJ&dq=lord+of+the+rings&hl=&source=gbs_api',
    'http://books.google.com/books/content?id=AVVoPwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    'NOT_MATURE',
    '4.5',
    2
  );
INSERT INTO todos (name, type_id, api_id,img,year,subtype)
VALUES
  ('Lucifer', 1, 'tt4052886',
  'https://m.media-amazon.com/images/M/MV5BZTA2NTBkYWUtMzM4Zi00YzhlLTk4NWItY2U1ODczNDMyNDAzXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg',
  '2015–', 'series'
  );

INSERT INTO
  todos (name, type_id, api_id, img, year, subtype)
VALUES
  ('Breaking Bad', 1, 'tt0903747',
  'https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  '2008–2013', 'series'
  );

INSERT INTO
  todos (name, type_id, api_id, img, year, subtype)
VALUES
  ('Harry Potter and the Deathly Hallows: Part 2', 1, 'tt1201607',
  'https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg',
  '2011', 'movie'
  );

INSERT INTO
  todos (name, type_id, api_id, img, year, subtype)
VALUES
  ('The Lord of the Rings: The Fellowship of the Ring', 1, 'tt0120737',
  'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
  '2001', 'movie'
  );

-- Example food things
INSERT INTO
  todos (name, type_id, api_id, img, subtype, user_rating, location, url)
VALUES
  ('Earls Test Kitchen', 4, '16617324',
  'https://b.zmtcdn.com/data/res_imagery/16617318_CHAIN_c3d642bf22a74a9e9db9fe101ee303ac_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
  'Canadian', '3.8', '905 Hornby Street, Vancouver V6Z1V3',
  'https://www.zomato.com/vancouver/earls-test-kitchen-downtown-vancouver?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1'
  );

INSERT INTO
  todos (name, type_id, api_id, img, subtype, user_rating, location, url)
VALUES
  ('Cactus Club Cafe', 4, '16620328',
  'https://b.zmtcdn.com/data/res_imagery/16626973_CHAIN_77ea442aa975262a0dc9969b7e6c26ac.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
  'Canadian', '3.7', '1598 Pemberton Avenue, North Vancouver V7P',
  'https://www.zomato.com/vancouver/cactus-club-cafe-lower-capilano?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1'
  );

INSERT INTO
  todos (name, type_id, api_id, img, subtype, user_rating, location, url)
VALUES
  ('Trees Organic Coffee', 4, '16618599',
  'https://b.zmtcdn.com/data/res_imagery/16622810_CHAIN_cfc43b222c799ea8a315f806248c4969_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
  'Cafe, Sandwich', '4.2', '450 Granville Street, Vancouver V6C1V4',
  'https://www.zomato.com/vancouver/trees-organic-coffee-downtown-vancouver?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1'
  );

INSERT INTO
  todos (name, type_id, api_id, img, subtype, user_rating, location, url)
VALUES
  ('Super Great Pizza', 4, '16622992',
  'https://b.zmtcdn.com/data/reviews_photos/67d/baadbbb9b6667696fde4564e7ab0067d_1560010854.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
  'Pizza, Fast Food', '3.8', '3388 Vanness Drive, Vancouver V5R',
  'https://www.zomato.com/vancouver/super-great-pizza-renfrew-collingwood-vancouver?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1'
  );

-- Example Music Things
INSERT INTO
  todos (name,
        type_id,
        api_id,
        url,
        genre,
        img,
        user_rating,
        subtype
        )
VALUES
  ('Richard Swift',
  3,
  '7fSjnDr8tBO37Xbb2UXuYr',
  'https://open.spotify.com/artist/7fSjnDr8tBO37Xbb2UXuYr',
  'freak folk',
  'https://i.scdn.co/image/a4bf04767c7fe138b73921d12d420bdb403aaaed',
  '49',
  'artist'
  );

INSERT INTO
  todos (name,
        type_id,
        api_id,
        author,
        url,
        img,
        year,
        subtype
        )
VALUES
  ('The Hex',
  3,
  '1T764WfpIEjIxme1YdUEzF',
  'Richard Swift',
  'https://open.spotify.com/artist/7fSjnDr8tBO37Xbb2UXuYr',
  'https://i.scdn.co/image/ab67616d0000b2738403cb494ddfa19bd35dfc07',
  '2018-09-21',
  'album'
  );

INSERT INTO
  todos (type_id,
        api_id,
        author,
        url,
        name,
        user_rating,
        img,
        subtype
        )
VALUES
  (3,
  '2XkuSbp5say8nZW8g6156Z',
  'Sam The Sham & The Pharaohs',
  'https://open.spotify.com/track/2XkuSbp5say8nZW8g6156Z',
  'Wooly Bully',
  '54',
  'https://p.scdn.co/mp3-preview/15f78fd0c74a576cddb1362fd8dae43b984b37a2?cid=774b29d4f13844c495f206cafdad9c86',
  'track'
  );

INSERT INTO
  todos (type_id,
        api_id,
        author,
        url,
        name,
        user_rating,
        img,
        subtype
        )
VALUES
  (3,
  '1B75hgRqe7A4fwee3g3Wmu',
  'MC Hammer',
  'https://open.spotify.com/track/1B75hgRqe7A4fwee3g3Wmu',
  'U Cant Touch This',
  '73',
  null,
  'track'
  );

-- Example book things
