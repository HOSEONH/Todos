
1. Home 컴포넌트에서 tenantId를 사용자 고유의 ID로 설정
const [tenantId, setTenantId] = useState<string>("your-unique-tenant-id");

2. @svgr/webpack 설치 Next.js에서 svg를 컴포넌트로 사용하기

3. 컴포넌트 설명
a. TodoContainer
- 할 일 목록을 관리하는 컨테이너 컴포넌트
- 기능: 할 일 추가, 완료/미완료 토글, 할 일 목록 가져오기

b. TodoDetailContainer
- 할 일 목록의 특정 항목의 세부 정보를 관리하는 컴포넌트

c. CheckList
- 할 일 목록을 렌더링하고, 완료 상태를 토글할 수 있는 체크리스트 아이템 컴포넌트

d. CheckListDetail
- 투두 항목의 체크박스를 표시하고 관리하는 체크리스트 아이템 컴포넌트

e. DetailPlus/DetailEdit
- 이미지 업로드 및 편집 버튼 아이템 컴포넌트

f. EditButton
- 수정 완료 버튼 컴포넌트

g. Delete
- 항목 삭제 버튼 컴포넌트

h. Search
- 사용자가 할 일 항목을 입력할 수 있는 인풋 필드 컴포넌트 

i. AddLargeActive 
- 사용자가 할 일 항목을 추가할 때 사용하는 버튼 컴포넌트 