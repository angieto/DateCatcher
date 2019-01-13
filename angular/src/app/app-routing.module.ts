import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UpcomingplanComponent } from './upcomingplan/upcomingplan.component';
import { GenerateplanComponent } from './generateplan/generateplan.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
    { path: '' , component: HomeComponent }, 
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent , children:[
        {path: 'contact/:id', component : DescriptionComponent}
    ] },
    { path: "dashboard/:id", component: DashboardComponent, children: [
        { path: '', component: OverviewComponent },
        { path: 'profile', component: UserprofileComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'plans/:id', component: CalendarComponent, children: [
            { path: "detail", component: DetailComponent }
        ]},
        { path : "randomize", component : GenerateplanComponent },
        { path: 'plans', component: UpcomingplanComponent },
        { path: 'calendar', component: CalendarComponent },
        { path: "detail", component: DetailComponent },
        { path: "randomize", component : GenerateplanComponent }
    ]},
    { path: "**", redirectTo: "/" } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
