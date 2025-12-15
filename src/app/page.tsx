'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas DGA por region
const OFICINAS = [
  { id: 1, nombre: 'DGA Arica y Parinacota', region: 'Arica y Parinacota', ciudad: 'Arica', direccion: 'Arturo Prat 305', telefono: '58 2232022', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 2, nombre: 'DGA Tarapaca', region: 'Tarapaca', ciudad: 'Iquique', direccion: 'Serrano 389', telefono: '57 2411550', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 3, nombre: 'DGA Antofagasta', region: 'Antofagasta', ciudad: 'Antofagasta', direccion: 'Av. Argentina 1840', telefono: '55 2268250', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Estudios'] },
  { id: 4, nombre: 'DGA Atacama', region: 'Atacama', ciudad: 'Copiapo', direccion: 'Los Carrera 645', telefono: '52 2213585', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 5, nombre: 'DGA Coquimbo', region: 'Coquimbo', ciudad: 'La Serena', direccion: 'Cordovez 220', telefono: '51 2206500', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Estudios'] },
  { id: 6, nombre: 'DGA Valparaiso', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Melgarejo 669', telefono: '32 2252776', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 7, nombre: 'DGA Metropolitana', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Morandé 59', telefono: '22 4494800', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Nacional'] },
  { id: 8, nombre: 'DGA OHiggins', region: 'OHiggins', ciudad: 'Rancagua', direccion: 'Cuevas 480', telefono: '72 2230330', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 9, nombre: 'DGA Maule', region: 'Maule', ciudad: 'Talca', direccion: '1 Sur 980', telefono: '71 2515200', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Estudios'] },
  { id: 10, nombre: 'DGA Nuble', region: 'Nuble', ciudad: 'Chillan', direccion: 'Arauco 353', telefono: '42 2433200', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 11, nombre: 'DGA Biobio', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Barros Arana 525', telefono: '41 2861500', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Estudios'] },
  { id: 12, nombre: 'DGA Araucania', region: 'Araucania', ciudad: 'Temuco', direccion: 'Bulnes 590', telefono: '45 2953600', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 13, nombre: 'DGA Los Rios', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'OHiggins 575', telefono: '63 2261500', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Estudios'] },
  { id: 14, nombre: 'DGA Los Lagos', region: 'Los Lagos', ciudad: 'Puerto Montt', direccion: 'Urmeneta 509', telefono: '65 2254800', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] },
  { id: 15, nombre: 'DGA Aysen', region: 'Aysen', ciudad: 'Coyhaique', direccion: 'Av. Ogana 1060', telefono: '67 2232400', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Estudios'] },
  { id: 16, nombre: 'DGA Magallanes', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'OHiggins 1048', telefono: '61 2247600', servicios: ['Derechos de Agua', 'Fiscalizacion', 'Catastro'] }
];

// Tipos de derechos de agua
const DERECHOS = [
  { nombre: 'Derecho Consuntivo', icono: '💧', descripcion: 'Permite consumir totalmente el agua sin obligacion de restituirla', ejemplos: ['Agua potable', 'Riego agricola', 'Uso industrial'], tipo: 'Permanente o eventual' },
  { nombre: 'Derecho No Consuntivo', icono: '🔄', descripcion: 'Obliga a restituir el agua utilizada al mismo cauce', ejemplos: ['Hidroelectricidad', 'Acuicultura', 'Recreacion'], tipo: 'Permanente o eventual' },
  { nombre: 'Derecho Permanente', icono: '📅', descripcion: 'Se ejerce en cualquier epoca del ano con caudal constante', ejemplos: ['Uso domestico', 'Industria continua', 'Mineria'], tipo: 'Sin restriccion temporal' },
  { nombre: 'Derecho Eventual', icono: '⏳', descripcion: 'Solo se ejerce cuando hay excedentes despues de los permanentes', ejemplos: ['Riego complementario', 'Uso estacional', 'Acumulacion'], tipo: 'Sujeto a disponibilidad' },
  { nombre: 'Derecho Superficial', icono: '🌊', descripcion: 'Aguas que escurren por cauces naturales o artificiales', ejemplos: ['Rios', 'Esteros', 'Canales'], tipo: 'Segun ubicacion' },
  { nombre: 'Derecho Subterraneo', icono: '⬇️', descripcion: 'Aguas que se encuentran bajo la superficie del suelo', ejemplos: ['Pozos', 'Norias', 'Sondajes'], tipo: 'Requiere estudio hidrogeologico' }
];

// Cuencas hidrograficas principales
const CUENCAS = [
  { nombre: 'Cuenca del Rio Loa', icono: '🏜️', region: 'Antofagasta', superficie: '33.570 km2', caracteristica: 'Rio mas largo de Chile, zona desertica', usos: ['Mineria', 'Agua potable', 'Agricultura limitada'] },
  { nombre: 'Cuenca del Rio Copiapo', icono: '🌵', region: 'Atacama', superficie: '18.400 km2', caracteristica: 'Cuenca cerrada, alta demanda minera', usos: ['Mineria', 'Agricultura', 'Agua potable'] },
  { nombre: 'Cuenca del Rio Elqui', icono: '🍇', region: 'Coquimbo', superficie: '9.826 km2', caracteristica: 'Valle viticola, embalse Puclaro', usos: ['Agricultura', 'Turismo', 'Agua potable'] },
  { nombre: 'Cuenca del Rio Aconcagua', icono: '🏔️', region: 'Valparaiso', superficie: '7.340 km2', caracteristica: 'Alta demanda agricola e industrial', usos: ['Agricultura', 'Industria', 'Agua potable'] },
  { nombre: 'Cuenca del Rio Maipo', icono: '🏙️', region: 'Metropolitana', superficie: '15.380 km2', caracteristica: 'Abastece a Santiago, glaciares andinos', usos: ['Agua potable', 'Agricultura', 'Hidroelectricidad'] },
  { nombre: 'Cuenca del Rio Maule', icono: '⚡', region: 'Maule', superficie: '20.295 km2', caracteristica: 'Mayor potencial hidroelectrico', usos: ['Hidroelectricidad', 'Agricultura', 'Riego'] },
  { nombre: 'Cuenca del Rio Biobio', icono: '🌲', region: 'Biobio', superficie: '24.369 km2', caracteristica: 'Rio mas caudaloso de Chile central', usos: ['Hidroelectricidad', 'Industria', 'Navegacion'] },
  { nombre: 'Cuenca del Rio Baker', icono: '🧊', region: 'Aysen', superficie: '26.726 km2', caracteristica: 'Rio mas caudaloso de Chile', usos: ['Conservacion', 'Turismo', 'Pesca'] }
];

// Pasos para obtener derechos de agua
const PASOS = [
  { paso: 1, titulo: 'Verificar disponibilidad', descripcion: 'Consultar en DGA si existe agua disponible en la cuenca', icono: '🔍' },
  { paso: 2, titulo: 'Elaborar solicitud', descripcion: 'Preparar formulario con especificaciones tecnicas del derecho', icono: '📝' },
  { paso: 3, titulo: 'Presentar en DGA', descripcion: 'Ingresar solicitud en oficina regional correspondiente', icono: '🏛️' },
  { paso: 4, titulo: 'Publicacion', descripcion: 'La DGA publica la solicitud para posibles oposiciones', icono: '📰' },
  { paso: 5, titulo: 'Resolucion', descripcion: 'DGA emite resolucion otorgando o denegando el derecho', icono: '⚖️' },
  { paso: 6, titulo: 'Inscripcion CBR', descripcion: 'Inscribir el derecho en el Conservador de Bienes Raices', icono: '✅' }
];

// Glosario de aguas
const GLOSARIO = [
  { termino: 'Caudal', definicion: 'Volumen de agua que pasa por un punto en un tiempo determinado (L/s)' },
  { termino: 'Cuenca', definicion: 'Territorio donde las aguas escurren hacia un cauce comun' },
  { termino: 'Acuifero', definicion: 'Formacion geologica capaz de almacenar y transmitir agua subterranea' },
  { termino: 'Aforo', definicion: 'Medicion del caudal de un curso de agua' },
  { termino: 'Bocatoma', definicion: 'Estructura para captar agua desde un cauce natural' },
  { termino: 'Embalse', definicion: 'Deposito artificial para almacenar agua' },
  { termino: 'Escorrentia', definicion: 'Agua que fluye por la superficie del terreno' },
  { termino: 'Nivel Freatico', definicion: 'Superficie superior del agua subterranea' },
  { termino: 'Recarga', definicion: 'Proceso de infiltracion que alimenta los acuiferos' },
  { termino: 'Trasvase', definicion: 'Transferencia de agua entre cuencas distintas' },
  { termino: 'Codigo de Aguas', definicion: 'DFL 1.122 que regula los derechos de aprovechamiento de aguas' },
  { termino: 'Junta de Vigilancia', definicion: 'Organizacion de usuarios que administra un rio o cuenca' }
];

export default function AguaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [consumoM3, setConsumoM3] = useState('');
  const [tipoTarifa, setTipoTarifa] = useState('residencial');
  const [region, setRegion] = useState('metropolitana');

  const oficinasFiltradas = OFICINAS.filter(
    (o) =>
      o.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.region.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.ciudad.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calculadora de consumo de agua
  const calcularConsumo = () => {
    if (!consumoM3) return null;
    const m3 = parseFloat(consumoM3);

    // Tarifas aproximadas por region (pesos/m3)
    const tarifas: Record<string, Record<string, number>> = {
      metropolitana: { residencial: 850, comercial: 1200, industrial: 950 },
      valparaiso: { residencial: 920, comercial: 1300, industrial: 1050 },
      biobio: { residencial: 750, comercial: 1100, industrial: 900 },
      norte: { residencial: 1100, comercial: 1500, industrial: 1200 },
      sur: { residencial: 680, comercial: 1000, industrial: 800 }
    };

    const tarifaBase = tarifas[region]?.[tipoTarifa] || 850;

    // Cargo fijo mensual
    const cargoFijo = tipoTarifa === 'residencial' ? 2500 : tipoTarifa === 'comercial' ? 5000 : 8000;

    // Consumo con tramos (residencial)
    let costoConsumo = 0;
    if (tipoTarifa === 'residencial') {
      if (m3 <= 10) {
        costoConsumo = m3 * tarifaBase * 0.8; // descuento primer tramo
      } else if (m3 <= 30) {
        costoConsumo = (10 * tarifaBase * 0.8) + ((m3 - 10) * tarifaBase);
      } else {
        costoConsumo = (10 * tarifaBase * 0.8) + (20 * tarifaBase) + ((m3 - 30) * tarifaBase * 1.5);
      }
    } else {
      costoConsumo = m3 * tarifaBase;
    }

    // Alcantarillado (aproximado 80% del agua)
    const alcantarillado = costoConsumo * 0.5;

    const subtotal = cargoFijo + costoConsumo + alcantarillado;
    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    return {
      m3,
      tarifaBase,
      cargoFijo: Math.round(cargoFijo),
      costoConsumo: Math.round(costoConsumo),
      alcantarillado: Math.round(alcantarillado),
      subtotal: Math.round(subtotal),
      iva: Math.round(iva),
      total: Math.round(total),
      tipo: tipoTarifa === 'residencial' ? 'Residencial' : tipoTarifa === 'comercial' ? 'Comercial' : 'Industrial'
    };
  };

  const resultado = calcularConsumo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900">
      {/* Header */}
      <header className="bg-blue-800/50 border-b border-blue-700/50">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <span className="text-5xl">💧</span>
            <div>
              <h1 className="text-3xl font-bold text-white">Agua</h1>
              <p className="text-blue-300">DGA - Direccion General de Aguas</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Oficinas */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-blue-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Oficinas DGA
          </h2>

          <input
            type="text"
            placeholder="Buscar por region, ciudad o nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-lg"
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {oficinasFiltradas.map((oficina) => (
              <motion.div
                key={oficina.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/5 rounded-xl p-4 border border-blue-500/20 hover:border-blue-400/50 transition-all"
              >
                <h3 className="font-bold text-white">{oficina.nombre}</h3>
                <p className="text-blue-300 text-sm">{oficina.ciudad}, {oficina.region}</p>
                <p className="text-gray-400 text-sm mt-1">{oficina.direccion}</p>
                <p className="text-blue-400 text-sm">Tel: {oficina.telefono}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {oficina.servicios.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-300">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Mostrando {oficinasFiltradas.length} de {OFICINAS.length} oficinas
          </p>
        </motion.div>
      </section>

      {/* Calculadora de Consumo */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-cyan-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Consumo de Agua
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-blue-300 mb-2">Consumo mensual (m3)</label>
                <input
                  type="number"
                  value={consumoM3}
                  onChange={(e) => setConsumoM3(e.target.value)}
                  placeholder="Ej: 20"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-blue-300 mb-2">Tipo de Tarifa</label>
                <select
                  value={tipoTarifa}
                  onChange={(e) => setTipoTarifa(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="residencial" className="bg-gray-800">Residencial</option>
                  <option value="comercial" className="bg-gray-800">Comercial</option>
                  <option value="industrial" className="bg-gray-800">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-blue-300 mb-2">Zona</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="metropolitana" className="bg-gray-800">Region Metropolitana</option>
                  <option value="valparaiso" className="bg-gray-800">Valparaiso</option>
                  <option value="biobio" className="bg-gray-800">Biobio</option>
                  <option value="norte" className="bg-gray-800">Zona Norte</option>
                  <option value="sur" className="bg-gray-800">Zona Sur</option>
                </select>
              </div>
            </div>

            {resultado && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">Estimacion de Cuenta</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Consumo:</span>
                    <span className="text-white">{resultado.m3} m3</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tipo:</span>
                    <span className="text-white">{resultado.tipo}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Cargo fijo:</span>
                    <span className="text-white">${resultado.cargoFijo.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Consumo agua:</span>
                    <span className="text-white">${resultado.costoConsumo.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Alcantarillado:</span>
                    <span className="text-white">${resultado.alcantarillado.toLocaleString('es-CL')}</span>
                  </div>

                  <div className="border-t border-blue-500/30 pt-3">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal:</span>
                      <span className="text-white">${resultado.subtotal.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>IVA (19%):</span>
                      <span className="text-white">${resultado.iva.toLocaleString('es-CL')}</span>
                    </div>
                  </div>

                  <div className="bg-cyan-500/20 rounded-lg p-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-300 font-medium">Total estimado:</span>
                      <span className="text-2xl font-bold text-white">${resultado.total.toLocaleString('es-CL')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Estimacion referencial. Consulte su boleta real con su empresa sanitaria.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Tipos de Derechos */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📋</span> Tipos de Derechos de Agua
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DERECHOS.map((derecho, i) => (
            <motion.div
              key={derecho.nombre}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 rounded-xl p-5 border border-blue-500/20 hover:border-blue-400/40 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{derecho.icono}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{derecho.nombre}</h3>
                  <p className="text-gray-400 text-sm mt-1">{derecho.descripcion}</p>
                  <p className="text-blue-400 text-sm mt-2">Tipo: {derecho.tipo}</p>
                  <div className="mt-2">
                    <p className="text-gray-500 text-xs">Ejemplos:</p>
                    <ul className="text-gray-400 text-xs list-disc list-inside">
                      {derecho.ejemplos.map((e, j) => (
                        <li key={j}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cuencas Hidrograficas */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🌊</span> Cuencas Hidrograficas de Chile
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CUENCAS.map((cuenca, i) => (
              <motion.div
                key={cuenca.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-blue-500/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{cuenca.icono}</span>
                  <h3 className="font-bold text-white text-sm">{cuenca.nombre}</h3>
                </div>
                <p className="text-blue-300 text-xs mb-2">{cuenca.region}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">Superficie: <span className="text-white">{cuenca.superficie}</span></p>
                  <p className="text-gray-400 text-xs">{cuenca.caracteristica}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cuenca.usos.map((uso, j) => (
                      <span key={j} className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-300">
                        {uso}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos para Obtener Derechos */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>📝</span> Pasos para Obtener Derechos de Agua
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {PASOS.map((paso, i) => (
            <motion.div
              key={paso.paso}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {paso.icono}
              </div>
              <div className="text-xs text-blue-400 mb-1">Paso {paso.paso}</div>
              <h3 className="font-bold text-white text-sm mb-1">{paso.titulo}</h3>
              <p className="text-gray-400 text-xs">{paso.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>📚</span> Glosario de Aguas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLOSARIO.map((item, i) => (
              <motion.div
                key={item.termino}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white/5 rounded-lg p-4 border border-blue-500/20"
              >
                <h3 className="font-bold text-blue-400 mb-1">{item.termino}</h3>
                <p className="text-gray-300 text-sm">{item.definicion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span>🔗</span> Recursos Oficiales
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { nombre: 'DGA', url: 'https://dga.mop.gob.cl', desc: 'Direccion General de Aguas - MOP' },
            { nombre: 'SISS', url: 'https://www.siss.gob.cl', desc: 'Superintendencia de Servicios Sanitarios' },
            { nombre: 'Codigo de Aguas', url: 'https://www.bcn.cl/leychile/navegar?idNorma=5605', desc: 'DFL 1.122 Codigo de Aguas' },
            { nombre: 'Catastro Publico', url: 'https://dga.mop.gob.cl/productosyservicios/derechos_702/', desc: 'Registro de derechos de agua' }
          ].map((recurso, i) => (
            <motion.a
              key={recurso.nombre}
              href={recurso.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-blue-500/20 transition-all"
            >
              <h3 className="font-bold text-white mb-1">{recurso.nombre}</h3>
              <p className="text-gray-400 text-sm">{recurso.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-700/50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            Agua - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-blue-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            El agua es un bien nacional de uso publico
          </p>
        </div>
      </footer>
    </div>
  );
}
