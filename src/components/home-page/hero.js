import Image from "next/image";
import React from "react";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          className={classes.actualImage}
          src="/images/site/IMG_3062.jpg"
          alt="An image showing Thomas "
          width={300}
          height={350}
        />
      </div>
      <h1>Hi, I'm Thomas👋</h1>
      <p>
        I am espiring to be a software developer but also enjoy building
        full-stack apps on my freetime as well. This is one of my first projects
      </p>
    </section>
  );
}

export default Hero;
