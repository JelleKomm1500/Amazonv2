using System;
using System.Collections.Generic;
using System.Linq;

namespace Models
{
    public class RobotPickUp : RobotTask
    {
        /// <summary>
        /// Method used to assign a barrel to a robot along with the point
        /// </summary>
        /// <param name="r"></param>
        public void StartTask(Robot r)
        {
            if (r.currentPoint.barrel != null && r.barrel == null)
            {
                r.AssignBarrel(r.currentPoint.barrel);
                r.currentPoint.barrel.AssignPoint(null);
                r.currentPoint.AddBarrel(null);
            }
        }

        /// <summary>
        /// Method to return a boolean value wether the robot has a barrel or not
        /// </summary>
        /// <param name="r"></param>
        /// <returns></returns>
        public bool TaskComplete(Robot r)
        {
            if (r.barrel != null)
            {
                return r.barrel != null;
            }
            return false;
        }
    }
}