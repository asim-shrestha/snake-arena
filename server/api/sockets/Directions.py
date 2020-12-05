Left = {'x': -1, 'y':  0}
Up = {'x':  0, 'y':  -1}
Right = {'x':  1, 'y':  0}
Down = {'x':  0, 'y': 1}
Still = {'x':  0, 'y': 0}
List = [Left, Up, Right, Down]

# Map of a direction string to the dict/JSON representation
DirectionStringToJSON = {
	"left": Left,
	"up": Up,
	"right": Right,
	"down": Down,
	"still": Still,
}

# Returns JSON encoding of direction from a direction string
# Used 
def GetDirectionFromString(dirStr):
	dirStr = str.lower(dirStr)
	return DirectionStringToJSON[dirStr]