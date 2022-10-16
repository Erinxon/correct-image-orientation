import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCheck } from '../models/image.model';

@Component({
  selector: 'app-check-images',
  templateUrl: './check-images.component.html',
  styleUrls: ['./check-images.component.css']
})
export class CheckImagesComponent implements OnInit, AfterViewInit {
  images: ImageCheck[] = [];
  answers: ImageCheck[] = [];
  private indexCorrects: number[] = [];

  constructor(public dialogRef: MatDialogRef<CheckImagesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private renderer: Renderer2) {  
      this.dialogRef.disableClose = false;
    }


  ngOnInit(): void {
    this.setValue();
  }

  ngAfterViewInit(): void {
    this.rotateImages();
  }

  private setValue(){
    const array = this.getArrayRange(6);
    this.images = array.map(() => {
      return {
        id: crypto.randomUUID(),
        path: 'assets/deers/deers.png',
        orientation: this.getRamdonNumber,
        isCorrect: false
      }
    });
  }

  private rotateImages(){
    let randomIndex = this.getRandomIndex;
    this.indexCorrects.push(randomIndex);
    const images = [...this.images];
    images.splice(randomIndex, 1);
    const imagesHtml = images.map(i => document.getElementById(i.id));
    imagesHtml.forEach((image, index) => {
      this.renderer.setStyle(
        image,
        'transform',
        `rotate(${images[index]?.orientation}deg)`
      )
    });
    const imagesorientationCorrect = this.images.find((image, index) => index === randomIndex);
    imagesorientationCorrect.isCorrect = true;
    imagesorientationCorrect.orientation = null;
  }

  private get getRandomIndex(){
    let randomIndex = Math.floor((Math.random() * (5 - 0 + 1)) + 0);
    if(this.indexCorrects.some(index => index === randomIndex)){
      randomIndex = this.getRandomIndex;
    }
    return randomIndex;
  }

  private getArrayRange(length: number){
    return  Array.apply(null, Array(length)).map(function (_, i) {return i;});
  }

  get getRamdonNumber(){
    let randomNumberPositive = Math.floor((Math.random() * (360 - 10 + 1)) + 10);
    let randomNumberNegative = Math.floor((Math.random() * (-360 - 10 + 1)) + 10);
    let randomNumbers = [randomNumberPositive, randomNumberNegative];
    let randomIndex = Math.floor((Math.random() * (1 - 0 + 1)) + 0);
    let randomNumber = randomNumbers[randomIndex];
    if(randomNumber === 180){
      randomNumber = this.getRamdonNumber
    }
    return randomNumber;
  }

  checkimage(imageCheck: ImageCheck){
    if(this.indexCorrects.length === this.images.length){
      this.showAnswers();
      return;
    }
    this.answers.push(imageCheck)
    this.reset();
  }

  private reset(){
    this.setValue();
    setTimeout(() => {
      this.rotateImages();
    }, 3);
  }

  private showAnswers(){
    console.log('si')
    const imagesHtml =  document.querySelector('.row');
    if(imagesHtml){
      const result = this.answers.every(a => a.isCorrect);
      imagesHtml.classList.add(result ? 'success' : 'danger');
    }
  }

}