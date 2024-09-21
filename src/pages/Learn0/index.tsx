import styles from "./styles.module.css";

export const Learn = ({}: any) => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Markmap para modelar tus Mindmaps</h1>
        <article>
          <h2>Markmap</h2> <strong>Markmap</strong> es un formato para
          visualizar mapas mentales en una estructura de árbol interactiva, que
          utiliza la sintaxis Markdown para definir los nodos y sus relaciones.
          Este formato es útil para representar ideas y conceptos de manera
          jerárquica, permitiendo una visualización clara y estructurada de la
          información. Markmap convierte el texto en una representación visual
          dinámica y navegable, facilitando la comprensión y exploración de la
          información.
        </article>

        <article>
          <h3>Sintaxis Markdown:</h3> Markmap usa una sintaxis basada en
          Markdown para estructurar la información en forma de un mapa mental.
          Cada nodo y subnodo se define con encabezados y subencabezados, lo que
          permite organizar las ideas de manera jerárquica y clara.
        </article>
        <article>
          <ol>
            <li>
              <strong>Encabezados:</strong>
              <ul>
                <li>
                  <strong>Uso:</strong> Los encabezados en Markdown (
                  <strong>#</strong>, <strong>##</strong>, <strong>###</strong>,
                  etc.) se utilizan para definir los nodos del mapa mental. Cada
                  nivel de encabezado representa un nivel jerárquico en el mapa
                  mental.
                </li>
                <li>
                  <strong>Ejemplo:</strong>
                  <h1># Título Principal</h1>
                  <h2>## Subtítulo 1</h2>
                  <h3> ### Subtítulo 2.1</h3>
                  <h2>## Subtítulo 2</h2>
                  <h3>### Subtítulo 2.2</h3>
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Listas:</strong>
              <ul>
                <li>
                  <strong>Uso:</strong> Las listas, tanto ordenadas (
                  <strong>1.</strong>,<strong>2.</strong> , etc.) como
                  desordenadas (<strong>-</strong>, <strong>*</strong>,
                  <strong>+</strong> ), pueden utilizarse para definir subnodos
                  y elementos secundarios dentro de un nodo principal.
                </li>
                <li>
                  <strong>Ejemplo:</strong>
                  <h1># Título Principal</h1>
                  <ul>
                    - Elemento 1<ul>- Sub-elemento 1.1</ul>
                    <ul>- Sub-elemento 1.2</ul>
                  </ul>
                  <ul>- Elemento 2</ul>
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Texto Enriquecido:</strong>
              <ul>
                <li>
                  <strong>Negritas:</strong> Utiliza <strong>**texto**</strong>
                  o&nbsp;
                  <strong>__texto__</strong> para poner en negrita.
                </li>
                <li>
                  <strong>Cursivas:</strong> Utiliza <strong>*texto*</strong>
                  o&nbsp;
                  <strong>_texto_</strong> para poner en cursiva.
                </li>
                <li>
                  <strong>Código:</strong> Utiliza <strong>`código`</strong>
                  para resaltar código en línea.
                </li>
                <li>
                  <strong>Bloques de Código:</strong> Utiliza tres comillas
                  invertidas (<strong>```</strong>) para definir bloques de
                  código.
                </li>
                <li>
                  <strong>Enlaces:</strong> Utiliza&nbsp;
                  <strong>
                    <i>[texto del enlace]</i>(URL)&nbsp;
                  </strong>
                  para agregar enlaces.
                </li>
                <li>
                  <strong>Imágenes:</strong> Utiliza&nbsp;
                  <strong>
                    <i>![texto alternativo]</i>(URL de la imagen)
                  </strong>
                  &nbsp; para insertar imágenes.
                </li>
                <li>
                  <strong>Ejemplo:</strong>
                  <h1># Titulo Principal</h1>
                  <br />
                  <strong>**Texto en negrita**</strong>
                  <br />
                  <i>*Texto en cursiva*</i>
                  <br />
                  <span>
                    ``` javascript
                    <br />
                    // Codigo en linea <br />
                    console.log('Hola, Markmap!');
                    <br />
                    ```
                  </span>
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Tareas:</strong>
              <ul>
                <li>
                  <strong>Uso:</strong> Los elementos de lista pueden tener
                  casillas de verificación para representar tareas.
                </li>
                <li>
                  <strong>Ejemplo:</strong>
                  <h1># Lista de Tareas</h1>
                  <span>- [ ] Tarea Pendiente</span>
                  <br />
                  <span>- [x] Tarea Completa</span>
                  <br />
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Citas:</strong>
              <ul>
                <li>
                  <strong>Uso:</strong> Utiliza <strong>&gt;</strong> para
                  incluir citas o bloques de texto citados.
                </li>
                <li>
                  <strong>Ejemplo:</strong>
                  <br />
                  &gt; Esta es una cita.
                </li>
              </ul>
            </li>
            <br />
            <li>
              <strong>Tablas:</strong>
              <ul>
                <li>
                  <strong>Uso:</strong> Las tablas se pueden definir utilizando
                  la sintaxis de Markdown para organizar datos en filas y
                  columnas.
                </li>
                <li>
                  <strong>Ejemplo:</strong>
                  <br />
                  <span>
                    | Encabezado 1 | Encabezado 2 |<br />
                    |--------------|--------------|
                    <br />
                    | Dato 1 | Dato 2 |<br />
                    | Dato 3 | Dato 4 |<br />
                  </span>
                </li>
              </ul>
            </li>
          </ol>
          <h3>Ejemplo completo.</h3>Un ejemplo completo de un documento Markdown
          que puede ser convertido a un mapa mental con Markmap:
          <span>
            <h1># Proyecto de Software</h1>
            <h2>## Fase de Planificación</h2>
            <ul>
              - Definición de Requisitos
              <ul>- Requisitos Funcionales</ul>
              <ul>- Requisitos No Funcionales</ul>
            </ul>
            <ul>- Análisis de Riesgos</ul>

            <h2>## Fase de Desarrollo</h2>
            <h3>### Diseño</h3>
            <ul>- Arquitectura del Sistema</ul>
            <ul>- Diseño de Base de Datos</ul>
            <h3>### Implementación</h3>
            <ul>
              - Desarrollo Frontend
              <ul>- Uso de React</ul>
              <ul>- Estilos con CSS</ul>
            </ul>
            <ul>
              - Desarrollo Backend
              <ul>- API con Node.js</ul>
              <ul>- Base de Datos con MongoDB</ul>
            </ul>

            <h2>## Fase de Pruebas</h2>
            <ul>- Pruebas Unitarias</ul>
            <ul>- Pruebas de Integración</ul>
            <ul>- Pruebas de Usuario</ul>

            <h2>## Fase de Despliegue</h2>
            <ul>- Preparación del Entorno</ul>
            <ul>- Despliegue en Servidores</ul>
            <ul>- Monitoreo y Mantenimiento</ul>
          </span>
        </article>
        <br />
        <article>
          <h3>Visualización Interactiva:</h3> Ofrece una visualización
          interactiva en forma de árbol donde los usuarios pueden expandir y
          contraer nodos para explorar diferentes niveles de información. Esta
          interactividad facilita la navegación y comprensión de la estructura
          del contenido.
        </article>
        <br />
        <article>
          <h3>Generación Dinámica:</h3> Los mapas mentales en Markmap se generan
          dinámicamente a partir de texto en formato Markdown. Esto permite una
          actualización rápida y fácil de los mapas mentales al modificar el
          texto fuente.
        </article>
        <br />
        <article>
          <h3>Compatibilidad con Herramientas Markdown:</h3> MMarkmap es
          compatible con herramientas que soportan Markdown, permitiendo
          integrar mapas mentales en documentos y plataformas que ya utilizan
          Markdown para otras formas de documentación.
        </article>
        <br />
        <article>
          <h3>Integración con Aplicaciones Web:</h3> Markmap puede integrarse en
          aplicaciones web para proporcionar visualizaciones de mapas mentales
          en interfaces de usuario. Esto es útil para aplicaciones de gestión de
          conocimientos, educación y presentación de información.
        </article>
        <br />
        <article>
          <h3>Facilidad de Uso:</h3> La sintaxis de Markmap es simple y fácil de
          aprender para quienes ya están familiarizados con Markdown. Esto
          facilita la adopción y creación de mapas mentales sin necesidad de
          herramientas complejas.
        </article>
        <br />
        <article>
          <h3>Personalización de Estilo:</h3> Ofrece opciones para personalizar
          el estilo y la apariencia de los mapas mentales, permitiendo ajustar
          el diseño para que se alinee con los requisitos estéticos o
          funcionales de un proyecto.
        </article>
        <br />
        <article>
          <h3>Exportación y Compartición:</h3> Los mapas mentales creados en
          Markmap pueden exportarse en formatos compatibles con diversas
          plataformas y ser compartidos fácilmente, facilitando la colaboración
          y distribución de la información representada.
        </article>
        <br />
      </div>
    </div>
  );
};
