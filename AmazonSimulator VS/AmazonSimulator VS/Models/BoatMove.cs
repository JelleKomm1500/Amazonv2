namespace Models{
    public class BoatMove : BoatTask{
        private Point point;

        /// <summary>
        /// Method to set the moving point
        /// </summary>
        /// <param name="point"></param>
        public BoatMove(Point point){
            this.point = point;
        }

        /// <summary>
        /// Method to move to the specified point
        /// </summary>
        /// <param name="t"></param>
        public void StartTask(Boat t)
        {
            t.Move(point);
        }

        /// <summary>
        /// Method to check if the moving is complete and returns true if this is the case
        /// </summary>
        /// <param name="t"></param>
        /// <returns></returns>
        public bool TaskComplete(Boat t)
        {
            if(t.x == point.x && t.y == point.y && t.z == point.z){
                return true;
            }
            return false;
        }
    }
}