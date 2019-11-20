-- Example movies things
INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Lucifer', 1, 540);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Breaking Bad', 1, 390);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Harry Potter', 1, 870);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Lord of the Rings', 1, 287);

-- Example food things
INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Earls'' Kitchen', 4, 245);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Cactus Club Cafe', 4, 435);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Trees Organic Coffee', 4, 945);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('Thierry', 4, 946);

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
INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('The Power', 2, 287);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('The Testaments', 2, 165);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('1984', 2, 324);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('World Without Fish', 2, 723);

INSERT INTO
  todos (name, type_id, api_id)
VALUES
  ('World Without Fish', 2, 723);
