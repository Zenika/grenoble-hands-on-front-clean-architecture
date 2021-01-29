import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NavbarComponent } from './navbar.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('NavbarComponent', () => {
    let component: NavbarComponent
    let fixture: ComponentFixture<NavbarComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [RouterTestingModule]
        })
                     .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
