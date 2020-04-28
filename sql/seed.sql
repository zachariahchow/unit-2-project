INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Fender Modern Player Telecaster Thinline Deluxe', 'guitar', 'https://media.karousell.com/media/photos/products/2020/04/08/fender_modern_player_telecaster_thinline_deluxe_3color_sunburst_1586328044_2c5b6e94_progressive.jpg');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Line 6 Helix-Lt', 'pedal', 'https://media.sweetwater.com/store/enhanced/items/HelixLT/d586b6-HelixLT.jpg');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Vox AC-15 Half-Stack (2x12" Cab)', 'amp', 'https://media.sweetwater.com/api/i/q-82__ha-5a8f650d48d06612__hmac-bdab6da6e16ac9fa212e77e77c1c8a3200ca2637/images/items/750/AC15Stack-large.jpg');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Planet Waves American Stage Guitar Cable (single right-angled tip)', 'accessory', 'https://images-na.ssl-images-amazon.com/images/I/41aJnQosiRL.jpg');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Planet Waves American Stage Guitar Cable (straight tips)', 'accessory', 'https://images-na.ssl-images-amazon.com/images/I/41aJnQosiRL.jpg');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'TC Electronic Polytune 2 Mini', 'pedal', 'https://ae01.alicdn.com/kf/HTB1QhjseJHO8KJjSZFtq6AhfXXac/TC-Electronic-PolyTune-2-Mini-Polyphonic-Tuning-Pedal-Small-format-Guitar-Tuner-Pedal-3-Chromatic-Tuning.jpg_640x640q70.jpg');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Strymon Big Sky Reverb', 'pedal', 'https://www.long-mcquade.com/files/50861/lg_0041a3ada2d76a1ee8ecb93d8256a2d9.');

INSERT INTO gear(user_id, name, type, img_link) VALUES('1', 'Ibanez 40th Anniversary TS808 Tubescreamer', 'pedal', 'https://cdn.shopify.com/s/files/1/2501/6068/products/I01-TS80840TH_1562321996731_500x500.jpg?v=1562322070');


--

INSERT INTO pedalboards (user_id, name) VALUES(1, 'General Purpose') RETURNING *;
INSERT INTO pedalboards (user_id, name) VALUES(1, 'Upcoming Show X') RETURNING *;

--

INSERT INTO pedalboards_gear (pedalboard_id, gear_id, gear_order) VALUES(1, 2, 1) RETURNING *;
INSERT INTO pedalboards_gear (pedalboard_id, gear_id, gear_order) VALUES(1, 6, 2) RETURNING *;

-- SELECT * FROM gear INNER JOIN pedalboards_gear ON gear.id = pedalboards_gear.gear_id WHERE user_id = 1;

--