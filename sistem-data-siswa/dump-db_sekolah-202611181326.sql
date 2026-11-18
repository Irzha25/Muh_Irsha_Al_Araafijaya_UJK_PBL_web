--
-- PostgreSQL database dump
--

\restrict Q9NlRU5NZJ3fEAgq2rEiNgaehVT5a6dfkPO9wso8a4yGPi6nE7gSpoFJqNPIsUa

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-18 13:26:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 17160)
-- Name: siswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.siswa (
    kode_siswa character varying(20) NOT NULL,
    nama_siswa character varying(100) NOT NULL,
    alamat_siswa text NOT NULL,
    tgl_siswa date NOT NULL,
    jurusan_siswa character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.siswa OWNER TO postgres;

--
-- TOC entry 5005 (class 0 OID 17160)
-- Dependencies: 219
-- Data for Name: siswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa, created_at) FROM stdin;
SIS-001	Muhammad Irzha	Jakarta Pusat	2004-05-15	Teknik Informatika	2026-11-18 11:08:41.901317
SIS-002	Ananda Fitri Adilla	Menteng, Jakarta Pusat	2005-04-12	Teknik Informatika	2026-11-18 13:01:49.871352
SIS-003	Muhammad Rizky	Jakarta Selatan	2006-02-15	Teknik Informatika	2026-11-18 13:17:35.147732
SIS-004	Siti Nurhaliza	Jakarta Barat	2005-08-21	Sistem Informasi	2026-11-18 13:17:45.126909
SIS-005	Andi Pratama	Bekasi	2006-11-09	Teknik Komputer	2026-11-18 13:17:52.550463
SIS-006	Dinda Maharani	Depok	2005-06-17	Manajemen Informatika	2026-11-18 13:17:59.430277
SIS-007	Fajar Ramadhan	Jakarta Pusat	2006-03-25	Sistem Informasi	2026-11-18 13:18:06.283025
SIS-008	Putri Amelia	Tangerang	2005-12-03	Teknik Informatika	2026-11-18 13:18:13.046594
SIS-009	Rafi Kurniawan	Jakarta Utara	2006-07-14	Teknik Komputer	2026-11-18 13:18:19.30261
SIS-010	Nadia Safitri	Jakarta Timur	2005-09-28	Manajemen Informatika	2026-11-18 13:18:40.432063
\.


--
-- TOC entry 4857 (class 2606 OID 17172)
-- Name: siswa siswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT siswa_pkey PRIMARY KEY (kode_siswa);


-- Completed on 2026-11-18 13:26:56

--
-- PostgreSQL database dump complete
--

\unrestrict Q9NlRU5NZJ3fEAgq2rEiNgaehVT5a6dfkPO9wso8a4yGPi6nE7gSpoFJqNPIsUa

