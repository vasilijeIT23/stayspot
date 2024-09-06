import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './models/users/users.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { CompaniesModule } from './models/companies/companies.module'
import { ManagersModule } from './models/managers/managers.module'
import { AccomodationModule } from './models/accomodation/accomodations.module'
import { ApartmentModule } from './models/appartments/apartments.module'
import { AddressModule } from './models/address/addresses.module'
import { BookingModule } from './models/booking/bookings.module'
import { StripeModule } from './models/stripe/stripe.module'

//Todo: Move this to util library.
const MAX_AGE = 60 * 60 * 24

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),
    GraphQLModule.forRoot(<ApolloDriverConfig>{
      driver: ApolloDriver,
      introspection: true, //allows you to query the schema for details about its types, queries, mutations
      fieldResolverEnhancers: ['guards'], //enables use of guards for validation and authentication
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //defines destination directory for the graphql schema
    }),
    UsersModule,
    CompaniesModule,
    ManagersModule,
    AccomodationModule,
    ApartmentModule,
    AddressModule,
    BookingModule,
    PrismaModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
