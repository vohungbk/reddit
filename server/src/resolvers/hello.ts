import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolvers {
  @Query((_returns) => String)
  hello() {
    return "Hello world";
  }
}
