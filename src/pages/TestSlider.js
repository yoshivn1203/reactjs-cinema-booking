import React from 'react';
import styled from 'styled-components';

const TestSlider = () => {
  return (
    <Wrapper>
      <input type='checkbox' id='navcheck' role='button' title='menu' />
      <label htmlFor='navcheck' aria-hidden='true' title='menu'>
        <span className='burger'>
          <span className='bar'>
            <span className='visuallyhidden'>Menu</span>
          </span>
        </span>
      </label>
      <nav id='menu'>
        <a href='#'>Lorem.</a>
        <a href='#'>Nesciunt!</a>
        <a href='#'>Magnam.</a>
        <a href='#'>Ipsum.</a>
        <a href='#'>Voluptatem.</a>
        <a href='#'>Quibusdam.</a>
      </nav>
      <main>
        <article className='content'>
          <h1>UI with UX improvement with only awesome CSS</h1>
          <p>
            <strong>
              Burger icon, animated nav background and off-trigger area (outside nav
              opened) made width pseudo-elements. No JS at all :)
            </strong>
          </p>
          <p>
            <strong>
              No repaint, no reflow, no JS, but the blur effect may be a little laggy,
              particularly on mobile devices.
            </strong>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum asperiores,
            minima obcaecati ex iusto alias minus excepturi sunt! Asperiores quibusdam
            iure numquam quis dicta at quisquam debitis minima perspiciatis modi?
          </p>
          <p>
            Asperiores impedit neque porro, minus cum. Nesciunt blanditiis, dolorum
            explicabo esse voluptates voluptas doloribus, vero voluptate veniam impedit
            nam doloremque unde inventore ipsum iste magnam perferendis assumenda in sunt
            deleniti.
          </p>
          <p>
            Cum quidem eum quos provident placeat aut tempore rem voluptates eveniet? Eos
            impedit aspernatur hic tenetur ipsum tempora exercitationem libero voluptas
            numquam necessitatibus. Error quisquam quaerat debitis suscipit velit dolore.
          </p>
          <p>
            Atque, ab libero! Cum quae cumque voluptate culpa accusantium iste aliquam
            illum quos facere quisquam, delectus, magnam neque dicta quibusdam libero
            itaque dolorem, tenetur vel dolores laudantium ratione asperiores
            voluptatibus.
          </p>
          <p>
            Fugiat praesentium omnis maiores atque sed perspiciatis quia laboriosam! Eius
            mollitia iusto quia libero, voluptate laborum labore ducimus beatae, quisquam,
            dicta laboriosam culpa voluptatem impedit maxime, a ex pariatur dignissimos.
          </p>
          <p>
            Dolores odio dolore quo? Autem iure dolorem ratione, odit reiciendis. Non
            pariatur voluptates, explicabo vitae, rem molestias in. Voluptates expedita
            iusto blanditiis commodi numquam. Hic atque natus dolore cupiditate velit.
          </p>
          <p>
            Ipsam ipsum quos, quibusdam nulla commodi dolorem impedit soluta odio natus.
            Ullam dolor consequatur tenetur similique cupiditate debitis natus tempore
            molestiae quo, inventore in quia earum explicabo eaque qui facilis.
          </p>
          <p>
            Iure, natus. Ipsam officia nostrum minima ut blanditiis asperiores neque esse
            itaque reprehenderit, et, porro ea nemo eligendi cum soluta fuga similique?
            Soluta, nam odio praesentium quas officia repellendus dicta.
          </p>
          <p>
            Modi voluptates, doloremque aliquam. Magnam numquam fugit aliquam veniam
            officiis iusto et assumenda cupiditate aspernatur voluptas expedita quo
            voluptatibus repudiandae, sapiente molestias, culpa eos placeat possimus quae!
            Aliquid dicta, atque?
          </p>
          <p>
            Laborum magni ipsam iure iste blanditiis saepe. Optio obcaecati quaerat
            soluta, vitae. Asperiores reiciendis minima, quidem iusto explicabo culpa
            quaerat atque! Cum nesciunt nam ducimus mollitia iste sapiente sit, eos.
          </p>
        </article>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  input {
    position: fixed;
    opacity: 0;
  }
  label {
    position: absolute;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
  }
  label::before {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 38, 57, 0.75);
    content: '';
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  label .burger {
    position: fixed;
    top: 10em;
    left: 1em;
    z-index: 3;
    width: 2em;
    height: 2em;
    margin: 0;
    padding: 0;
    transition: opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  label .burger::before,
  label .burger .bar,
  label .burger::after {
    position: absolute;
    left: 0;
    display: block;
    width: 100%;
    height: 12%;
    background: white;
    content: '';
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  label .burger .bar {
    top: 44%;
  }
  label .burger::before {
    top: 0;
    transform-origin: top left;
  }
  label .burger::after {
    bottom: 0;
    transform-origin: bottom left;
  }
  input:focus + label .burger,
  label:hover .burger {
    opacity: 0.75;
  }
  nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    transform: translate3d(0, 0, 0);
    /* material acceleration */
    transform: translateX(-100%);
    will-change: transform;
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  nav::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -160%;
    z-index: -1;
    width: 80em;
    background: #d62956;
    content: '';
    transform: skewX(15deg) translateX(-100%);
    transform-origin: bottom left;
    will-change: transform;
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  @media (min-width: 40em) {
    nav::before {
      width: 80rem;
    }
  }
  nav a {
    margin: 0.5em 0;
    padding: 0.2em 2em;
    font-size: 1.5em;
    color: white;
    text-decoration: none;
    font-weight: 500;
    transform: translateX(-100%);
    transition: color 0.15s, transform 0.5s;
    transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  }
  nav a:nth-child(1) {
    transition-delay: 0s, 100ms;
  }
  nav a:nth-child(2) {
    transition-delay: 0s, 150ms;
  }
  nav a:nth-child(3) {
    transition-delay: 0s, 200ms;
  }
  nav a:nth-child(4) {
    transition-delay: 0s, 250ms;
  }
  nav a:nth-child(5) {
    transition-delay: 0s, 300ms;
  }
  nav a:nth-child(6) {
    transition-delay: 0s, 350ms;
  }
  nav a:hover,
  nav a:focus {
    color: black;
  }
  main {
    overflow: hidden;
  }
  main .content {
    transform: translate3d(0, 0, 0);
    /* material acceleration */
    will-change: transform, filter;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  [id='navcheck']:checked + label::before {
    opacity: 1;
    pointer-events: auto;
  }
  [id='navcheck']:checked + label .burger::before,
  [id='navcheck']:checked + label .burger::after {
    width: 141.42%;
  }
  [id='navcheck']:checked + label .burger::before {
    transform: rotate(45deg) translateY(-50%);
  }
  [id='navcheck']:checked + label .burger::after {
    transform: rotate(-45deg) translateY(50%);
  }
  [id='navcheck']:checked + label .burger .bar {
    transform: scale(0.1);
  }
  [id='navcheck']:checked ~ nav {
    transform: translateX(0);
  }
  [id='navcheck']:checked ~ nav::before {
    transform: skewX(-15deg) translateX(0);
  }
  [id='navcheck']:checked ~ nav a {
    transform: translateX(0);
  }
  [id='navcheck']:checked ~ main .content {
    transform: translateX(3em);
    transform-origin: left center;
    filter: blur(2px);
  }
  /* helper */
  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  /* misc */
  body {
    overflow-x: hidden;
    background: #444;
    color: white;
    font: 1em/1.4 'lato';
  }
  main {
    background: #3498db;
    padding: 5% 0;
  }
  article {
    width: 80%;
    margin: 0 auto;
    font-size: 1.3em;
  }
  @media (min-width: 60em) {
    article {
      width: 50%;
    }
  }
  h1 {
    font: 2.5em/1.4 'roboto condensed';
    font-weight: 700;
  }
`;

export default TestSlider;
