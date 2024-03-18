# json-server

## Usage

Create a `db.json` or `db.json5` file

```json
{
        "title": "Apple Related Title 15",
        "description": "This is a sample description containing more than thirty words related to Apple. It is a placeholder text used to demonstrate JSON data structure in a blog website context.",
        "createdAt": "2022-09-29T12:13:57.406997",
        "image": "https://via.placeholder.com/300",
        "author": "Author Name",
        "view": 41,
        "comments": [
            {
                "id": "1",
                "text": "A comment about post 15"
            },
            {
                "id": "2",
                "text": "Another comment about post 15"
            }
        ],
        "id": "15"
    },
```


Get a REST API

```shell
$ curl http://localhost:3000/posts/1
{
        "title": "Apple Related Title 15",
        "description": "This is a sample description containing more than thirty words related to Apple. It is a placeholder text used to demonstrate JSON data structure in a blog website context.",
        "createdAt": "2022-09-29T12:13:57.406997",
        "image": "https://via.placeholder.com/300",
        "author": "Author Name",
        "view": 41,
        "comments": [
            {
                "id": "1",
                "text": "A comment about post 15"
            },
            {
                "id": "2",
                "text": "Another comment about post 15"
            }
        ],
        "id": "15"
    },
```

Run `json-server --help` for a list of options


## Routes

Based on the example `db.json`, you'll get the following routes:

```
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
PATCH  /posts/:id
DELETE /posts/:id


## Params

### Conditions

-   ` ` → `==`
-   `lt` → `<`
-   `lte` → `<=`
-   `gt` → `>`
-   `gte` → `>=`
-   `ne` → `!=`

```
GET /posts?views_gt=9000
```

### Range

-   `start`
-   `end`
-   `limit`

```
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate

-   `page`
-   `per_page` (default = 10)

```
GET /posts?_page=1&_per_page=25
```

### Sort

-   `_sort=f1,f2`

```
GET /posts?_sort=id,-views
```

### Embed

```
GET /posts?_embed=comments
GET /comments?_embed=post
```

## Delete

```
DELETE /posts/1
DELETE /posts/1?_dependent=comments
```
