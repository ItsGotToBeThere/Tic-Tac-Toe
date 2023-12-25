board = [[0] * 3 for _ in range(3)]
game = True
count = 0

def row(x,y,board,playernum):
    win = True
    for i in range(3):
        win&=board[x][i]==playernum
    return win

def column(x,y,board,playernum):
    win = True
    for i in range(3):
        win&=board[i][y]==playernum
    return win

def diagup(x,y,board,playernum):
    win = True
    for i in range(3):
        win&=board[i][i]==playernum

def diagdown(x,y,board,playernum):
    win = True
    for i in range(2,-1,-1):
        win&=board[i][i]==playernum
    return win



def win(x,y,board,playernum):
    return row(x,y,board,playernum) or column(x,y,board,playernum) or diagup(x,y,board,playernum) or diagdown(x,y,board,playernum)


while (game):
    x,y = [int(n)-1 for n in input().split()]
    playernum=0
    if (count%2):
        playernum=2
    else:
        playernum=1
    board[x][y]=playernum
    count+=1
    print(board)
    if win(x,y,board,playernum):
        print(f"Player number {playernum} has won")
        game = False

