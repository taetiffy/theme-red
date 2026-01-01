"use client";

import { Button, Card, CardHeader, CardBody, CardFooter, Image } from "@heroui/react";
import styles from "@/styles/random.module.css";
import { LootBoxCardProps } from "@/types/LootBoxcard";
export default function LootBoxCard({
  image,
  title,
  subtitle,
  buttonText,
  onOpen,
}: LootBoxCardProps) {
  return (
      <div className="dark w-full md:w-auto">
        <Card>
          <CardBody className="relative mb-4 px-10 flex justify-center items-center ">
            <div className="flex justify-center items-center w-50 h-50">
              <Image src={image} className=" w-full h-full object-contain" />
            </div>
            <div className=" absolute bottom-0 left-0 z-20 flex items-center flex-col justify-center w-full">
              <span className="text-2xl font-bold text-center mt-4">{title}</span>
              {subtitle && <p className="text-gray-500 text-center">{subtitle}</p>}
            </div>
          </CardBody>
          <CardFooter>
            <Button className="Btn1 w-full" size="lg" onPress={onOpen}>
              {buttonText}
            </Button>
          </CardFooter>
        </Card>

        {/* <div className={styles.imageWrapper}>
          <div className={`${styles.imageBox} ${styles.perspective1000}`}>
            <img src={image} alt={title} className={`${styles.rotateY12} object-contain`} />
          </div>
        </div>

        <div className={styles.absoluteBox}>
          <div className={styles.textCenterBox}>
            <h2 className={styles.textTitle}>{title}</h2>
            {subtitle && <p className={styles.textSub}>{subtitle}</p>}
          </div>

          <Button
            className={`${styles.openBoxBtn} Btn1`}
            size="lg"
            onPress={onOpen}
          >
            {buttonText}
          </Button>
      </div> */}
    </div>
  );
}
