use actix_web::{get, web, App, HttpResponse, HttpServer};
use deadpool_postgres::Pool;

mod postgres;
mod user;

//return value of 6 for mock data of /users endpoint using /other endpoint
#[get("/other")]
async fn other() -> HttpResponse {
    //200 ok response should json legnth=6
    HttpResponse::Ok().json(vec![1, 2, 3, 4, 5, 6])
}



#[get("/users")]
async fn list_users(pool: web::Data<Pool>) -> HttpResponse {
    let client = match pool.get().await {
        Ok(client) => client,
        Err(err) => {
            log::debug!("unable to get postgres client: {:?}", err);
            return HttpResponse::InternalServerError().json("unable to get postgres client");
        }
    };
    match user::User::all(&**client).await {
        Ok(list) => HttpResponse::Ok().json(list),
        Err(err) => {
            log::debug!("unable to fetch users: {:?}", err);
            return HttpResponse::InternalServerError().json("unable to fetch users");
        }
    }
}

//create a new user from the register form
#[get("/register")]
//read values email and password from the register form
async fn register() -> HttpResponse {
    //deserialize email and password from json 
    let user = web::Json::from_json(&**client).await;
    match user::User::register(&**client).await {
        Ok(list) => HttpResponse::Ok().json(list),
        Err(err) => {
            log::debug!("unable to fetch users: {:?}", err);
            return HttpResponse::InternalServerError().json("unable to fetch users");
        }
    }
}



fn address() -> String {
    std::env::var("ADDRESS").unwrap_or_else(|_| "127.0.0.1:8000".into())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    let pg_pool = postgres::create_pool();
    postgres::migrate_up(&pg_pool).await;

    let address = address();
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pg_pool.clone()))
            .service(list_users)
            .service(other)
    })
    .bind(&address)?
    .run()
    .await
}
