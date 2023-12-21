## 확인하기

> 실행을 위해 아래 조건을 만족해야 합니다. 조건을 만족하지 않을 경우 정상적인 실행을 보장할 수 없습니다.

- Node.js - v20.9.0
- npm - v10.1.0
- MongoDB - v6.0.12

## 시작하기

1. 이 프로젝트를 `clone` 해주세요.
2. `npm install`로 `dependencies`, `devDependencies`를 설치해 주세요.
3. `npm run dev`로 실행해 주세요.
4. Postman과 같은 프로그램으로 API를 호출해 보세요.

## 참고하기

- 읽기, 수정, 삭제와 같이 `_id`가 필요한 부분은 먼저 쓰기 API를 실행 후 진행해 주세요.
- `_id`는 MongoDB 자체 고유 아이디입니다.
- 형식은 String이고 24자리입니다.
- POST 생성 API 호출 시 `_id` 값이 필요한 경우 해당 부분을 먼저 생성 후 반환된 `_id` 값을 사용해 주세요.
- `secret key`를 사용하는 기능들은 삭제되었습니다.
- 현재 `최소 API`만 공개되어 있습니다.

## API 호출하기

> `npm run dev`로 프로젝트를 실행 후 `http://localhost:5000/API`를 입력해서 호출해 주세요.

- 이제 `http://localhost:5000`은 `{{base_url}}`입니다.
- 회원가입 후 로그인하고 반환받은 `token` 값으로 `Bearer token`을 설정해 주세요.

### User API

* 회원가입
`POST {{base_url}}/user/register`
```Javascript
{
    "name": "관리자",
    "role": "admin",
    "email": "admin@shopping.com",
    "phone": "012-345-6789",
    "address": "경기 성남시 분당구 판교역",
    "password": "1234"
}
```

* 전체 회원 조회
`GET {{base_url}}/user/users`

* 로그인
`POST {{base_url}}/user/login`
```Javascript
{
    "email": "admin@shopping.com",
    "password": "1234"
}
```

* 특정 회원 조회
`GET {{base_url}}/user/:_id`

* 특정 회원 삭제
`DELETE {{base_url}}/user/:_id`

### Product Category API
* 상품 카테고리 생성
`POST {{base_url}}/product/category`
```Javascript
{
    "name": "스마트폰",
    "value": "smartphone"
}
```

* 전체 상품 카테고리 조회
`GET {{base_url}}/product/category`

* 특정 상품 카테고리 조회
`GET {{base_url}}/product/category/:_id`

* 특정 상품 카테고리 수정
`PUT {{base_url}}/product/category/update/:_id`
```Javascript
{
    "name": "태블릿",
    "value": "tablet"
}
```

* 특정 상품 카테고리 삭제
`DELETE {{base_url}}/product/category/:_id`

### Brand API
* 브랜드 생성
`POST {{base_url}}/brand`
```Javascript
{
    "name": "삼성",
    "value": "samsung"
}
```

* 전체 브랜드 조회
`GET {{base_url}}/brand`

* 특정 브랜드 조회
`GET {{base_url}}/brand/:_id`

* 특정 브랜드 수정
`PUT {{base_url}}/brand/update/:_id`
```Javascript
{
    "name": "애플",
    "value": "apple"
}
```

* 특정 브랜드 삭제
`DELETE {{base_url}}/brand/:_id`

### Color API
* 컬러 생성
`POST {{base_url}}/color`
```Javascript
{
    "name": "#ffffff",
    "hex": "#ffffff"
}
```

* 전체 컬러 조회
`GET {{base_url}}/color`

* 특정 컬러 조회
`GET {{base_url}}/color/:_id`

* 특정 컬러 수정
`PUT {{base_url}}/color/update/:_id`
```Javascript
{
    "name": "#000000",
    "value": "#000000"
}
```

* 특정 컬러 삭제
`DELETE {{base_url}}/color/:_id`

### Product API
* 상품 생성
`POST {{base_url}}/color`
```Javascript
{
    "name": "Galaxy S23 Ultra",
    "category": "smartphone",
    "brand": "samsung",
    "description": "지구를 위해 모두를 위해 자연을 위해, 더 나아가 우리 모두를 위해 재활용 글라스, 재활용 PET 필름 등 자연을 생각하는 소재로 완성한 갤럭시 S23 Ultra를 100 % 재활용 종이 박스에 담아 전합니다. 착하게 만드는 것은 기본, 불필요한 포장까지 줄이려는 노력. 당신과 함께 실천해 갑니다.",
    "price": 1499000,
    "colors": ["6582a987ab186b1550553bde", "6582a9acab186b1550553be2", "6582a9c0ab186b1550553be6", "6582a9d2ab186b1550553bea"],
    "quantity": 400
}
```

* 전체 상품 조회
`GET {{{base_url}}/product`

* 특정 상품 조회
`GET {{base_url}}/product/:_id`

* 특정 상품 수정
`PUT {{{base_url}}/product/update/:_id`
```Javascript
{
    "name": "Galaxy S9+ 5G",
    "category": "tablet",
    "brand": "samsung",
    "description": "See Great, Be Great 당신의 잠재력을 일깨워 줄 새로운 갤럭시 탭 S9 시리즈를 소개합니다. 언제 어디서든 선명하게 보고, 펜으로 쓰고, 창조하세요.",
    "price": 1599100,
    "colors": ["6582a987ab186b1550553bde", "6582aaf7ab186b1550553c01"],
    "quantity": 400
}
```

* 특정 상품 삭제
`DELETE {{{base_url}}/product/:_id`
