import {Component, OnInit} from '@angular/core';
import {CityPresenter, CityPresenterVM} from "@grenoble-hands-on/web-adapters";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  public vm: CityPresenterVM = this.cityPresenter.vm;

  constructor(private cityPresenter: CityPresenter, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cityPresenter.fetchCityWithWeather(this.route.snapshot.params.cityId)
    this.cityPresenter.onVmUpdate(vm => {
      this.vm = vm
    })
  }

}
