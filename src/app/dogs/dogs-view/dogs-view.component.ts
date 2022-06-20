import {Component, OnInit} from '@angular/core';
import {DogsService} from "../dogs.service";
import {DogsResponse} from "../dogs-response.interface";
import {map, startWith} from 'rxjs/operators';
import {Dogs} from "../dogs.interface";
import {BehaviorSubject, combineLatest} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dogs-view',
  templateUrl: './dogs-view.component.html',
  styleUrls: ['./dogs-view.component.css']
})
export class DogsViewComponent implements OnInit {

  breeds$ = new BehaviorSubject<Dogs[]>([])

  selectedBreed = new FormControl('')

  filteredBreeds$ = combineLatest([this.breeds$, this.selectedBreed.valueChanges.pipe(startWith(''))]).pipe(
    map(([dogs, selected]: [Dogs[], string | null]) => {

      return selected ? dogs.filter((dog) => dog.name === selected) : dogs

    })
  )

  constructor(private readonly dogsService: DogsService) {
  }

  ngOnInit(): void {
    this.dogsService.getDogs().pipe(
      map((dogsResponse: DogsResponse) => {
          return Object.entries(dogsResponse.message).map(([name, types]: [string, string[]]) => {
            return {name, types}
          })
        }
      ))
      .subscribe((dogs: Dogs []) => {
          this.breeds$.next(dogs)
        }
      )

  }
  onReverse() {
    this.filteredBreeds$ = combineLatest([this.breeds$, this.selectedBreed.valueChanges.pipe(startWith(''))]).pipe(
      map(([dogs, selected]: [Dogs[], string | null]) => {

        return selected ? dogs.filter((dog) => dog.name === selected) : dogs.reverse()

      })
    )
  }


}
