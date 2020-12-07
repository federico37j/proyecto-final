USE articulos_del_hogar;
  
-- -----------------------------------------------------
-- Table `CATEGORIA`
-- -----------------------------------------------------

INSERT INTO `CATEGORIA` (`nombre`) VALUES ('Tecnología'), ('Electrodomesticos'), ('Pequeños Electrodomésticos'), ('Hogar y Jardín'), ('Deportes');
-- SELECT * FROM CATEGORIA;

-- -----------------------------------------------------
-- Table `ARTICULO`
-- -----------------------------------------------------

INSERT INTO `ARTICULO`(`nombre`, `precio`, `financiacion`, `detalle`, `tipo`, `stock`, `idCategoria`) VALUES 
-- TECNOLOGÍA
('Smart Tv 32 HD L32S6500 Con Android TCL',23999,'18 x $ 1592','Contraste 3000:1 - Brillo 250cd - Tiempo de respuesta 8ms - Norma de video Pal-N / Pal-M /NTSC - WiFi - Puerto de Red - HDMI x2 - USB x2 - Salida para auriculares - Salida de audio óptico digital - Sintonizador Digital TDA','televisores',5,1),
('Celular Libre S20+ 6 7 128 GB Gris SAMSUNG',114999,'18 x $ 11750','Pantalla Infinity-O Display de 6.9" WQHD+ Dynamic Amoled 2X - Procesador Exynos 990 Octa-Core 2.7GHz - Memoria RAM de 12GB - Almacenamiento interno de 128GB - Expandible hasta 1TB con tarjeta MicroSD - Cuadruple Cámara trasera de 108MP + 48MP (T) + 12MP (UW) + ToF - Cámara Frontal de 48MP','celulares',6,1),
('IMPRESORA XP-2101 INALAMBRICA EPSON',10999,'18 x $ 1124','Imprime/Copia/Scannea/Inalámbrica - Diseño compacto - Coenctividad completa - Epson Connect: impresión móvil y en la nube - Cartuchos individuales y muy económicos - Excelente para documentos y fotos - Tecnología de impresión: Inyección de tinta MicroPiezo de 4 colores - Configuración de inyectores: 180 inyectores negros (59 inyectores por color)','informatica',7,1),
('Notebook LENOVO Core i7 Con 16GB de RAM THINKPAD T490',194999,'18 x $ 10.833','Pantalla 14" FHD (1920x1080) - Procesador Intel Core i7 10510U - Memoria RAM 16GB DDR4 2400MHz - Almacenamiento M.2 SATA 256GB - Windows 10 Pro 64 - Video Intel UHD Graphics - Modelo THINKPAD T490','informatica',8,1),
('Auricular Bluetooth In Ear DW-308IE-BK Negro DAEWOO',2699,'18 x $ 179','Auricular con tecnología TWS - Bluetooth 5.0 - Display LED - Rango de frecuencia 2.4Hz - Autonomía 4hs de reproducción - Tiempo de recarga 2hs - Batería de Lithio Polimer 40mA - Color Negro','informatica',8,1),
-- ELECTRODOMÉSTICOS
('Aire Acondicionado Split Frío Calor 7740 Frigorías',119999,'18 x $ 6667', 'Aire Split Frio/Calor - Tecnología On/Off - Capacidad de Frío 3450W - Potencia de Refrigeración 1060W - Capacidad de Calor 3550W - Potencia de Calefacción 970W - Eficiencia Energética (Frío/Calor) A','climatizacion',9,2),
('HELADERA con Freezer PATRICK de 394 Litros',62999,'18 x $ 3500','Heladera con freezer - 394 litros de capacidad - Capacidad Freezer 124 litros - Capacidad Refrigerador 268 litros - Descongelamiento cíclico - Eficiencia Energética A','heladeras',8,2),
('Cocina Multigas 4 Hornallas 56 CM ESCORIAL',20999,'18 x $ 1167','Color Negra - 4 hornallas con quemadores de aluminioinyectados. - 3 quemadores medianos - 1 quemador grande con tapas de acero enlozado - Doble reja de plancha - Puerta de horno con doble vidrio - Horno y parrilla con enlozado fácil limpieza','cocina',7,2),
('Termotanque Multigas Carga Superior T3110F 110 Lts LONGVIE',30999,'18 x $ 1722','Capacidad del tanque 110L - Aislación térmica con eficiencia elevada - Barra de protección anti-corrosión - Sistema de conexión multigas - Piloto analizador de oxígeno - Tanque interior enlozado','cocina',8,2),
('Microondas B228DB9 28L 900W DIGITAL Blanco',23999,'18 x $ 1592','Microondas Bifunción digital (Grill) 28 litros - Capacidad 28 L - Color Blanco - Alimentación 220V~50 Hz - Ficha 10A - Consumo Maximo 1450 W - Potencia Salida 900 W (M.O.) - 1150 W (Grill)','cocina',20,2),
-- DEPORTES
('Bicicleta Mountain Bike MTB 25 PRO Rodado 29',49999,'18 x $ 3317','Cuadro MTB aluminio SIAMBRETTA 25 PRO - Calco al agua bajo barniz - Transmisión 21V - Cambio SHIMANO TOURNEY TZ31 - Manijas integradas SHIMANO EF41 - Palancas triple ALUMINIO SLP - Piñon 7 velocidades - Horquilla suspensión SIAMBRETTA - Frenos a disco SLP mecánico','bicicletas',10,5),
('RELOJ T. HILFIGER TH1782124 TOMMY HILFIGER',23299,'18 x $ 1294','Color: Rosé - Correa: Acero inoxidable - Genero: Mujer - Sumergibilidad: 3 ATM - Funciones: horas y minutos - Movimiento: cuarzo.','relojes',11,5),
('Cinta Caminadora Motorizada RAN-505 RANBAK',192199,'18 x $ 10678','Motor 3.00 HPP - Velocidad Máx 14 Km/h - Display Velocidad Tiempo Distancia y Calorías - Programas 12 - Plegable Si con descenso suave - Banda de Movimiento 130 x 41 cm - Modelo RAN-505','accesorios',12,5), 
('Kayak Inflable Challenger K2 20528/9 INTEX',38599,'18 x $ 2144', 'Capacidad para 2 persona de hasta 160 kg - Dispone de 2 cámaras de aire independientes con válvula boston para un rápido inflado y desinflado - El suelo del Challenger K2 también es inflable e incorpora un asiento inflable desmontable y regulable también incluye una quilla de dirección - Además el Kayak viene con dos remos dobles de aluminio y un inflador','accesorios',15,5),
('MOCHILA P/NOTEBOOK ESPACE 15.6 DELSEY',9599,'6 x $ 1600','Mochila portanotebook (un compartimiento) - Apta para notebook 15.6" - Faja para sujetar a carro de valija - Medidas 46 x 30 x 15.5 cm - Capacidad 21 litros - Peso 0.6 kg','mochilas',15,5);

-- SELECT * FROM ARTICULO;

-- -----------------------------------------------------
-- Table `IMAGEN_ARTICULO`
-- -----------------------------------------------------

INSERT INTO `IMAGEN_ARTICULO` (`imagen`, `principal`, `idArticulo`) VALUES

-- <TECNOLOGÍA>
-- SMART TV
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845949/secundarias/tv/tv-principal_uoj7eh.jpg',true,1),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845316/secundarias/tv/tv-secundaria3_kiz2yj.jpg',false,1),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845315/secundarias/tv/tv-secundaria2_uti1rg.jpg',false,1),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845315/secundarias/tv/tv-secundaria1_c6vpng.jpg',false,1),
-- CELULAR 
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845716/secundarias/celular/celular-principal_c6ehmu.jpg',true,2),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845311/secundarias/celular/celular-secundaria3_ewc8ay.jpg',false,2),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845311/secundarias/celular/celular-secundaria2_mari5q.jpg',false,2),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845310/secundarias/celular/celular-secundaria1_kgnm2e.jpg',false,2),
-- IMPRESORA
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845860/secundarias/impresora/impresora-principal_xxuwk1.jpg',true,3),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845313/secundarias/impresora/impresora-secundaria1_kydxmn.jpg',false,3),
-- NOOTEBOOK
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845826/secundarias/computadora/computadora-principal_i0qylv.jpg',true,4),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845312/secundarias/computadora/computadora-secundaria2_mrzb4y.jpg',false,4),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845312/secundarias/computadora/computadora-secundaria3_nk26e5.jpg',false,4),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845311/secundarias/computadora/computadora-secundaria1_i66vab.jpg',false,4),
-- AURICULAR
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845674/secundarias/auricular/auricular-principal_jylik5.jpg',true,5),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845310/secundarias/auricular/auricular-secundaria3_rufza5.jpg',false,5),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845310/secundarias/auricular/auricular-secundaria2_iaxvaj.jpg',false,5),

-- <ELECTRODOMÉSTICOS>
-- AIRE ACONDICIONADO
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845631/secundarias/aire/aire-principal_cub4sp.jpg',true,6),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845310/secundarias/aire/aire-secundaria1_f00cln.jpg',false,6),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845310/secundarias/aire/aire-secundaria3_qly6st.jpg',false,6),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845309/secundarias/aire/aire-secundaria2_sk5mu5.jpg',false,6),
-- HELADERA
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845839/secundarias/heladera/heladera-principal_wohhog.jpg',true,7),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845313/secundarias/heladera/heladera-secundaria3_ihtksd.jpg',false,7),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845312/secundarias/heladera/heladera-secundaria1_oohdsm.jpg',false,7),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845312/secundarias/heladera/heladera-secundaria2_u30qvk.jpg',false,7),
-- COCINA
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845812/secundarias/cocina/cocina-principal_gl4hq6.jpg',true,8),
-- TERMOTANQUE
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845936/secundarias/termotanque/termotanque-principal_phw6e9.jpg',true,9),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845315/secundarias/termotanque/termotanque-secundaria3_jakjed.jpg',false,9),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845315/secundarias/termotanque/termotanque-secundaria2_tqyd1i.jpg',false,9),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845315/secundarias/termotanque/termotanque-secundaria1_dt70le.jpg',false,9),
-- MICROONDAS
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845900/secundarias/microondas/microondas-principal_lqfjn0.jpg',true,10),

-- <DEPORTES>
-- BICICLETA
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845775/secundarias/bicicleta/bicicleta-principal_plq7ql.jpg',true,11),
-- RELOJ
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845927/secundarias/reloj/reloj-principal_dpilsb.jpg',true,12),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845315/secundarias/reloj/reloj-secundaria1_dkii49.jpg',false,12),
-- CINTA
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845735/secundarias/cinta/cinta-principal_ehyses.jpg',true,13),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845311/secundarias/cinta/cinta-secundaria1_y7mt9e.jpg',false,13),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845310/secundarias/cinta/cinta-secundaria2_ee0d3x.jpg',false,13),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845311/secundarias/cinta/cinta-secundaria3_s1ypyi.jpg',false,13),
-- KAYAK
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845882/secundarias/kayak/kayak-principal_hmtggx.jpg',true,14),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845313/secundarias/kayak/kayak-secundaria1_fzm43a.jpg',false,14),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845313/secundarias/kayak/kayak-secundaria2_wjnght.jpg',false,14),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845313/secundarias/kayak/kayak-secundaria3_plz6ns.jpg',false,14),
-- MOCHILA
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845914/secundarias/mochila/mochila-principal_fm18w8.jpg',true,15),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845314/secundarias/mochila/mochila-secundaria3_naygmo.jpg',false,15),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845314/secundarias/mochila/mochila-secundaria2_hqcc5y.jpg',false,15),
('https://res.cloudinary.com/dpqkhmplb/image/upload/v1606845313/secundarias/mochila/mochila-secundaria1_ctsr7i.jpg',false,15);

-- SELECT * FROM IMAGEN_ARTICULO;

-- -----------------------------------------------------
-- Table `LOCAL`
-- -----------------------------------------------------

INSERT INTO `LOCAL`(`cuit`, `nombre`, `direccion`, `codigo_area`, `nro_telefono`) VALUES ('33-70966111-9', 'Four Home', 'Garibaldi 1583', 0249, 4449482);

-- SELECT * FROM LOCAL;

-- -----------------------------------------------------
-- Table `USUARIO`
-- -----------------------------------------------------

INSERT INTO `USUARIO`(`email`, `password`, `direccion`, `ciudad`, `esAdmin`) VALUES 
('jorge@grupo4.com',123456,'Evergreen 666','Tangamandapio',false),
('nico@grupo4.com',123456,'Butterfly st.','God City',false),
('federico@grupo4.com',123456,'Gral paz 51','Tandil',true);

-- SELECT * FROM USUARIO;