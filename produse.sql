DROP TYPE IF EXISTS tipuri_branduri;
DROP TYPE IF EXISTS tipuri_vestimentare;

CREATE TYPE tipuri_branduri AS ENUM('Nike', 'Adidas', 'Ralph Lauren', 'Reebok', 'Lanvin Curb', 'New Balance', 'Evisu', 'Off-White','Altceva');
CREATE TYPE tipuri_vestimentare AS ENUM('incaltaminte', 'imbracaminte', 'accesorii');

CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY, --a
   nume VARCHAR(50) UNIQUE NOT NULL, --b
   descriere TEXT, --c
   imagine VARCHAR(300), --d
   tip_produs tipuri_vestimentare NOT NULL,--e
   brand tipuri_branduri DEFAULT 'Altceva',--f
   pret NUMERIC(8,2) NOT NULL, --g
   greutate INT NOT NULL CHECK (greutate>=0), --h
   data_adaugare TIMESTAMP DEFAULT current_timestamp, --i
   marimi VARCHAR[] DEFAULT '{"s","m","l","xl"}', --k  
   material VARCHAR(20) NOT NULL, --j
   in_stoc BOOLEAN NOT NULL DEFAULT TRUE --l
);

INSERT INTO produse (nume, descriere, imagine, tip_produs, brand, pret, greutate, material, marimi, data_adaugare, in_stoc) VALUES 
('Camasa Evisu', 'Camasa de la Evisu', 'url_imaginii_camasa_evisu.jpg', 'imbracaminte', 'Evisu', 120.00, 300, 'bumbac', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Tricou Evisu Evergreen', 'Tricou Evisu Evergreen', 'url_imaginii_tricou_evisu_evergreen.jpg', 'imbracaminte', 'Evisu', 75.00, 150, 'bumbac', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Tricou Evisu Clasic', 'Tricou Evisu Clasic', 'url_imaginii_tricou_evisu_clasic.jpg', 'imbracaminte', 'Evisu', 80.00, 160, 'bumbac', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Tricou Ralph Lauren Clasic', 'Tricou Ralph Lauren Clasic', 'url_imaginii_tricou_ralph_lauren_clasic.jpg', 'imbracaminte', 'Ralph Lauren', 90.00, 170, 'bumbac', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Blugi Evisu Chinese', 'Blugi Evisu Chinese', 'url_imaginii_blugi_evisu_chinese.jpg', 'imbracaminte', 'Evisu', 220.00, 600, 'denim', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Blugi Evisu Graffiti', 'Blugi Evisu Graffiti', 'url_imaginii_blugi_evisu_graffiti.jpg', 'imbracaminte', 'Evisu', 240.00, 620, 'denim', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Pantaloni Evisu Clasici', 'Pantaloni Evisu Clasici', 'url_imaginii_pantaloni_evisu_clasici.jpg', 'imbracaminte', 'Evisu', 180.00, 400, 'bumbac', '{"s","m","l","xl"}', CURRENT_TIMESTAMP, true),
('Adidasi Off-White Off-Court', 'Adidasi Off-White Off-Court', 'url_imaginii_adidasi_off_white_off_court.jpg', 'incaltaminte', 'Off-White', 350.00, 800, 'textil', '{"40","41","42","43"}', CURRENT_TIMESTAMP, true),
('Adidasi Off-White Out Of Office', 'Adidasi Off-White Out Of Office', 'url_imaginii_adidasi_off_white_out_of_office.jpg', 'incaltaminte', 'Off-White', 380.00, 850, 'textil', '{"40","41","42","43"}', CURRENT_TIMESTAMP, true),
('Adidasi Off-White Sponge', 'Adidasi Off-White Sponge', 'url_imaginii_adidasi_off_white_sponge.jpg', 'incaltaminte', 'Off-White', 400.00, 900, 'textil', '{"40","41","42","43"}', CURRENT_TIMESTAMP, true),
('Adidasi Lanvin Curb', 'Adidasi Lanvin Curb', 'url_imaginii_adidasi_lanvin_curb.jpg', 'incaltaminte', 'Lanvin Curb', 280.00, 700, 'textil', '{"40","41","42","43"}', CURRENT_TIMESTAMP, true),
('Adidasi New Balance 1000r', 'Adidasi New Balance 1000r', 'url_imaginii_adidasi_new_balance_1000r.jpg', 'incaltaminte', 'New Balance', 270.00, 650, 'textil', '{"40","41","42","43"}', CURRENT_TIMESTAMP, true),
('Sosete Nike', 'Sosete Nike', 'url_imaginii_sosete_nike.jpg', 'accesorii', 'Nike', 15.00, 50, 'textil', '{"35-38","39-42","43-46"}', CURRENT_TIMESTAMP, true),
('Sosete Adidas', 'Sosete Adidas', 'url_imaginii_sosete_adidas.jpg', 'accesorii', 'Adidas', 18.00, 55, 'textil', '{"35-38","39-42","43-46"}', CURRENT_TIMESTAMP, true),
('Sapca Ralph Lauren', 'Sapca Ralph Lauren', 'url_imaginii_sapca_ralph_lauren.jpg', 'accesorii', 'Ralph Lauren', 40.00, 100, 'textil', '{"S/M","M/L"}', CURRENT_TIMESTAMP, true);

-- gramaj-greutate
--calorii-marimi
--ingrediente-material
--categorie-tip produs
