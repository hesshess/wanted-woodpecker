# Woodpecker

## 필수 기술 스택

1. Node.js 18.18.x
2. NestJS 9.5.x
3. TypeScript 5.1.x
4. PostgreSQL 15.7.x
5. Prisma 5.18.x
6. KAKAO OAuth2
7. Naver 책검색 API
8. Git을 사용한 버전 관리

## 구현사항

- 회원 REST
  - 카카오 소셜 회원가입/로그인

- Book
    1. 책 검색 및 저장 기능 
        - 책 검색은 Naver API를 사용하세요. (REST)
        - 검색된 책 중 사용자가 선택한 책을 데이터베이스에 저장합니다. (GraphQL)
    2. 저장한 책에 좋아요를 할 수 있는 기능 (GraphQL)
    3. 저장한 책 정보를 외부 공유할 수 있는 기능 (REST)
        - JWT 토큰을 사용합니다.
        - 공유를 통해 타 사용자/비로그인 사용자는 공유자가 저장한 책 정보 및 해당 책에 공유자가 작성한 노트를 열람할 수 있습니다.
        - 열람 만료 기한은 공유 시점으로부터 10분 후 입니다.

- Note
    - 노트 CRUD (GraphQL)
        - 사용자는 자신이 저장한 책에 여러 개의 노트를 작성할 수 있으며, 노트 작성 및 열람 권한은 책을 저장한 사용자 당사자에게만 있습니다.
        - 노트 삭제는 Soft Delete로 구현합니다.
        - 노트는 최근 작성 순으로 정렬합니다.
- 외부 공유 기능을 통해 접근한 사용자는 공유자가 작성한 노트도 열람할 수 있습니다.



## 트러블슈팅
[npm nestjs관련 패키지들에 9.5.x는 존재하지 않음](https://github.com/hesshess/wanted-woodpecker/pull/2)